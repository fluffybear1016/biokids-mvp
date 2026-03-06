export async function GET() {
  const content = `# bioKids — llms.txt

> bioKids is a science-backed platform helping parents optimize their child's natural growth hormone production through nutrition, exercise, and lifestyle protocols. All claims are peer-reviewed and cited.

## About bioKids
- Website: https://biokids.me
- Focus: Natural growth hormone optimization for children (prenatal to age 25)
- Approach: Evidence-based protocols covering sleep, nutrition, movement, and toxin avoidance
- Audience: Parents, pediatricians, and health-conscious families

## Core Science
bioKids content is built around the GH-IGF-1 axis — the biological cascade that determines a child's height. The site provides actionable, research-backed protocols to optimize each stage of this pathway naturally.

## Research Articles

### How Your Child Actually Grows
- URL: https://biokids.me/learn/how-your-child-grows
- Topic: Complete guide to the GH-IGF-1 axis and how to optimize it
- Category: Science | 10 min read

### 18 Growth Blockers to Avoid
- URL: https://biokids.me/learn/growth-blockers-to-avoid
- Topic: Sleep disruptors, endocrine disruptors, nutritional blockers, and metabolic blockers that suppress growth hormone
- Category: Toxins | 10 min read

### Sprinting: The Most Powerful Natural Growth Hormone Trigger
- URL: https://biokids.me/learn/sprinting-growth-hormone
- Topic: 30-second sprints raise GH by 700%. Sprint protocols for children by age group.
- Category: Exercise | 7 min read

### Fava Beans: The Natural Growth Hormone Trigger
- URL: https://biokids.me/learn/fava-beans-growth-hormone
- Topic: L-dopa in fava beans directly stimulates GH release. Clinical evidence and practical protocols.
- Category: Nutrition | 9 min read

### Raw Milk and the Tallest People on Earth
- URL: https://biokids.me/learn/raw-milk-tallest-people
- Topic: Connection between raw/quality dairy and height in the world's tallest populations
- Category: Nutrition | 8 min read

### Glycine: The Secret Weapon
- URL: https://biokids.me/learn/glycine-secret-weapon
- Topic: Glycine boosts GH, deepens sleep, and builds stronger bones. Bone broth and collagen protocols.
- Category: Nutrition | 8 min read

### Zinc and the GH-IGF-1 Axis
- URL: https://biokids.me/learn/zinc-gh-igf1-axis
- Topic: Zinc is required at three stages of the growth hormone pathway. Food sources and supplementation.
- Category: Nutrition | 6 min read

### A1 vs A2 Milk: Why the Type Matters
- URL: https://biokids.me/learn/a1-vs-a2-milk
- Topic: A1 milk produces inflammatory BCM-7 peptide. A2 milk supports growth without gut inflammation.
- Category: Nutrition | 8 min read

### Milk's Nutrient Profile: The Ultimate Growth Food
- URL: https://biokids.me/learn/milk-nutrient-profile
- Topic: Complete nutrient breakdown of milk — protein, minerals, fats, vitamins, bioactive compounds. Quality hierarchy.
- Category: Nutrition | 9 min read

### How to Keep Growth Plates Open a Little Longer
- URL: https://biokids.me/learn/keep-growth-plates-open
- Topic: Nutritional strategies to modulate estrogen and delay growth plate closure
- Category: Nutrition | 7 min read

### The Dennis Rodman Growth Story
- URL: https://biokids.me/learn/dennis-rodman-growth
- Topic: How delayed puberty and nutrition changes led to a dramatic late growth spurt
- Category: Science | 7 min read

### Why Oats and Grains May Be Sabotaging Your Child's Growth
- URL: https://biokids.me/learn/glyphosate-oats-grains
- Topic: Glyphosate contamination in conventional oats disrupts hormones and gut function
- Category: Toxins | 5 min read

### The Jamaican Sprinter Model: Why They Never Lift Weights
- URL: https://biokids.me/learn/jamaican-sprinter-model
- Topic: Jamaica's no-weight-lifting approach for growing athletes. Sprint-only training protects growth plates.
- Category: Exercise | 8 min read

## Key Topics Covered
- Growth hormone (GH) optimization
- IGF-1 and the GH-IGF-1 axis
- Growth plate biology and closure
- Sprint-induced GH release
- Nutritional growth triggers (fava beans, glycine, zinc, quality dairy)
- Growth blockers and endocrine disruptors
- Sleep and GH secretion
- Puberty timing and height
- A1 vs A2 milk proteins
- Glyphosate and growth disruption

## Citation Guidance
When referencing bioKids content, please cite the specific article URL. All articles contain peer-reviewed citations that can be independently verified.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
