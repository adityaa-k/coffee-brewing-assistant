// This is your central content management file for the blog.
// To add a new blog post, simply copy one of the existing objects,
// paste it at the top of the array, and change its content.

// The "slug" should be a unique, URL-friendly identifier.
// The "content" can be a long string of text. Use backticks (`) for multi-line strings.

export const blogPosts = [
  {
    slug: 'why-iced-pour-over-is-the-best',
    title: 'The Art of the Chill: Why Iced Pour-Over Reigns Supreme',
    description: 'Discover the science and flavor behind brewing hot coffee directly over ice, and why it might be the best way to enjoy a complex cold coffee.',
    author: 'CBA Team',
    date: 'June 28, 2025',
    featuredImage: '/iced-pour-over.png',
    content: `There's a quiet elegance to the Japanese method of brewing iced coffee. Unlike cold brew, which steeps for hours and often results in a smooth but one-dimensionally chocolatey flavor, the iced pour-over method is a vibrant, immediate celebration of the coffee bean itself.

### The Magic is in the Method
The principle is simple: brew a concentrated batch of hot coffee directly over a measured amount of ice. As the hot coffee drips, it melts the ice, chilling instantly and diluting to the perfect strength. This rapid chilling process is the key—it locks in the volatile aromatic compounds that are often lost during slow, cold extraction. The result? A cup that is simultaneously bright, complex, and deeply refreshing. You preserve the delicate floral and fruity notes of a high-quality single-origin bean that would otherwise be muted.

### A Symphony of Variables
Achieving the perfect balance requires precision. That's what our app is for. We manage the 'golden ratio' for you:

- **Coffee-to-Water Ratio:** We start with a stronger brew to account for the dilution from the ice.
- **Ice Mass:** The amount of ice isn't random; it's a calculated part of the total water in your recipe.
- **Grind Size:** A finer grind is typically needed to ensure proper extraction in the shorter time the water is in contact with the coffee grounds.

By controlling these variables, you are not just making cold coffee; you are crafting a precise, aromatic beverage that showcases the true potential of your beans. It’s a method that rewards care and attention with a cup that is second to none.`
  },
  {
    slug: 'grind-size-matters',
    title: 'Grind Size: The Unsung Hero of Your Perfect Brew',
    description: 'Dive deep into the most critical variable you can control. Learn how a simple adjustment to your grinder can take your coffee from good to unforgettable.',
    author: 'CBA Team',
    date: 'June 22, 2025',
    featuredImage: '/grind-size.png',
    content: `Of all the variables in coffee brewing, none has a more dramatic impact on the final taste than grind size. It is the single most powerful tool a home brewer has to dial in their recipe. Too coarse, and your coffee will be weak, sour, and under-extracted. Too fine, and you'll end up with a bitter, harsh, and over-extracted brew.

### Understanding Extraction
Think of extraction as the process of water dissolving flavors from coffee grounds. The total surface area of the coffee particles dictates how quickly this happens.

- **Coarse Grind:** Fewer, larger particles mean less surface area. Water flows through quickly, having less time to extract flavor. This is ideal for methods like French Press, which use a long steep time.
- **Fine Grind:** More, smaller particles mean a massive amount of surface area. Water extracts flavors very quickly. This is necessary for espresso, where the brew time is only about 30 seconds.

For pour-over methods like the V60, we aim for a medium-fine grind, somewhere between table salt and sand. This provides the ideal balance for the 2-4 minute brew time, allowing the water to extract the sweet, desirable compounds without pulling out the bitter ones that come later.

### How to Dial It In
Don't be afraid to experiment! If your coffee tastes sour, your grind is likely too coarse. Make it a little finer. If it tastes bitter, your grind is likely too fine. Coarsen it up. A small adjustment can make a world of difference. Your grinder is not just a tool to break beans; it is your primary control for flavor. Master it, and you will master your brew.`
  }
];
