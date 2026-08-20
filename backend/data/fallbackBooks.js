const catalogue = [
  ["How to Grow Your Online Store", "business"], ["Top 10 Fiction Books This Year", "fiction"], ["Mastering SEO", "business"], ["Best eCommerce Platforms", "business"], ["Non-Fiction Reads You Must Try", "non-fiction"], ["Ultimate Guide to Digital Marketing", "business"], ["The First Days", "horror"], ["The Hunger Games", "fiction"], ["Harry Potter and the Order of the Phoenix", "adventure"], ["Pride and Prejudice", "fiction"], ["To Kill a Mockingbird", "fiction"], ["The Fault in Our Stars", "romance"], ["The Picture of Dorian Gray", "horror"], ["The Giving Tree", "children"], ["Gone with the Wind", "fiction"], ["The Lightning Thief", "adventure"], ["Alice's Adventures in Wonderland", "adventure"], ["Divergent", "science-fiction"], ["The Alchemist", "adventure"], ["Four Thousand Weeks", "self-help"], ["The Midnight Library", "fiction"], ["Atomic Habits", "self-help"], ["Educated", "memoir"], ["Project Hail Mary", "science-fiction"], ["The Silent Patient", "thriller"], ["Deep Work", "business"], ["A Court of Thorns and Roses", "fantasy"], ["The Thursday Murder Club", "mystery"], ["Sapiens", "history"], ["The House in the Cerulean Sea", "fantasy"],
];

const fallbackBooks = catalogue.map(([title, category], index) => {
  const number = index + 1;
  return {
    _id: `fallback-${number}`,
    title,
    category,
    description: `${title} is a carefully selected ${category} title for curious readers. Discover a compelling story or practical ideas, thoughtfully presented for your next reading session.`,
    trending: number % 3 !== 0,
    coverImage: `book-${((index % 20) + 1)}.png`,
    oldPrice: Number((18.99 + (index % 8) * 3).toFixed(2)),
    newPrice: Number((12.99 + (index % 7) * 2.5).toFixed(2)),
    createdAt: new Date(2025, 0, number).toISOString(),
  };
});

export default fallbackBooks;
