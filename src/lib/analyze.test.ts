import { describe, expect, it } from "vitest";
import { RULES } from "@/data/eu-rules";
import { analyzeIngredients, explain, normalize } from "./analyze";

const ids = (text: string, tags: string[] = []) => analyzeIngredients({ ingredientsText: text, additivesTags: tags }).flagged.map((r) => r.id);

describe("normalize", () => {
  it("strips FD&C and No. decorations", () => {
    expect(normalize("FD&C Red No. 40")).toBe("red 40");
    expect(normalize("D&C Yellow #5")).toBe("yellow 5");
  });
});

describe("analyzeIngredients", () => {
  it("flags the real Pop-Tarts label: TBHQ, Red 40, Yellow 6", () => {
    const text = "soybean and palm oil (with tbhq for freshness), sugar, red 40, yellow 6, blue 1, color added.";
    expect(ids(text)).toEqual(expect.arrayContaining(["red-40", "yellow-6", "tbhq"]));
  });

  it("matches by OFF additive tag even when the text doesn't say it", () => {
    expect(ids("sugar, water", ["en:e171"])).toEqual(["titanium-dioxide"]);
  });

  it("matches aliases and e-numbers in the text", () => {
    expect(ids("colored with Allura Red AC")).toContain("red-40");
    expect(ids("contains E129")).toContain("red-40");
  });

  it("does not match inside longer words or numbers", () => {
    expect(ids("red 400 lake")).not.toContain("red-40");
    expect(ids("red 30 lake")).not.toContain("red-3");
    expect(ids("alphabet pasta")).not.toContain("bha");
  });

  it("matches Red 3 only as its own token", () => {
    expect(ids("FD&C Red No. 3")).toContain("red-3");
    expect(ids("red 3, red 40")).toEqual(expect.arrayContaining(["red-3", "red-40"]));
  });

  it("takes the worst status as the verdict", () => {
    expect(analyzeIngredients({ ingredientsText: "red 40, titanium dioxide" }).verdict).toBe("ban");
    expect(analyzeIngredients({ ingredientsText: "red 40" }).verdict).toBe("limit");
    expect(analyzeIngredients({ ingredientsText: "water, sugar" }).verdict).toBe("ok");
  });

  it("orders flagged rules worst first", () => {
    const flagged = analyzeIngredients({ ingredientsText: "red 40, titanium dioxide" }).flagged;
    expect(flagged.map((r) => r.status)).toEqual(["ban", "limit"]);
  });

  it("reports when there is no ingredient data at all", () => {
    expect(analyzeIngredients({ ingredientsText: "", additivesTags: [] }).hasIngredients).toBe(false);
    expect(analyzeIngredients({}).hasIngredients).toBe(false);
    expect(analyzeIngredients({ ingredientsText: null, additivesTags: null }).hasIngredients).toBe(false);
  });
});

describe("explain", () => {
  it("says the amount can't be checked for limit rules", () => {
    const bht = RULES.find((r) => r.id === "bht")!;
    expect(explain(bht)).toContain("Labels don't show the amount");
  });
  it("leaves that line out for warning-label rules", () => {
    const red40 = RULES.find((r) => r.id === "red-40")!;
    expect(explain(red40)).not.toContain("Labels don't show the amount");
  });
});

describe("rules table", () => {
  it("never uses words the design system forbids", () => {
    const text = JSON.stringify(RULES).toLowerCase();
    for (const word of ["unsafe", "toxic", "dangerous", "banned in europe"]) expect(text).not.toContain(word);
  });
  it("has unique ids", () => {
    expect(new Set(RULES.map((r) => r.id)).size).toBe(RULES.length);
  });
});
