/* =========================================================
   API cục bộ cho BookStore — ~65 sách kèm ảnh sẵn (Picsum)
   Không cần tự tìm ảnh. Có thể chạy offline qua Live Server.
   ========================================================= */

const cover = (seed) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/600`;

const BOOKS = [
  // BUSINESS
  { id: 1,  title: "7 Thói Quen Hiệu Quả", author: "Stephen R. Covey", price: 115000, category: "Business", image: cover("7-habits") },
  { id: 2,  title: "Dạy Con Làm Giàu", author: "Robert Kiyosaki",       price: 125000, category: "Business", image: cover("rich-dad") },
  { id: 3,  title: "Think and Grow Rich", author: "Napoleon Hill",       price: 119000, category: "Business", image: cover("think-grow-rich") },
  { id: 4,  title: "Từ Tốt Đến Vĩ Đại", author: "Jim Collins",          price: 135000, category: "Business", image: cover("good-to-great") },
  { id: 5,  title: "Khởi Nghiệp Tinh Gọn", author: "Eric Ries",         price: 129000, category: "Business", image: cover("lean-startup") },
  { id: 6,  title: "Zero to One", author: "Peter Thiel",                 price: 135000, category: "Business", image: cover("zero-to-one") },
  { id: 7,  title: "The Personal MBA", author: "Josh Kaufman",           price: 145000, category: "Business", image: cover("personal-mba") },
  { id: 8,  title: "The Hard Thing About Hard Things", author: "Ben Horowitz", price: 149000, category: "Business", image: cover("hard-thing") },
  { id: 9,  title: "Blue Ocean Strategy", author: "W. Chan Kim",         price: 139000, category: "Business", image: cover("blue-ocean") },
  { id: 10, title: "Hooked", author: "Nir Eyal",                         price: 119000, category: "Business", image: cover("hooked") },

  // SELF-HELP
  { id: 11, title: "Đắc Nhân Tâm", author: "Dale Carnegie",             price: 99000,  category: "Self-help", image: cover("dac-nhan-tam") },
  { id: 12, title: "Atomic Habits", author: "James Clear",               price: 125000, category: "Self-help", image: cover("atomic-habits") },
  { id: 13, title: "Khéo Ăn Nói Sẽ Có Được Thiên Hạ", author: "Trác Nhã", price: 99000, category: "Self-help", image: cover("kheo-an-noi") },
  { id: 14, title: "Deep Work", author: "Cal Newport",                   price: 129000, category: "Self-help", image: cover("deep-work") },
  { id: 15, title: "The Power of Now", author: "Eckhart Tolle",          price: 135000, category: "Self-help", image: cover("power-of-now") },
  { id: 16, title: "The 5 AM Club", author: "Robin Sharma",              price: 125000, category: "Self-help", image: cover("5am-club") },
  { id: 17, title: "You Are a Badass", author: "Jen Sincero",            price: 109000, category: "Self-help", image: cover("you-are-a-badass") },
  { id: 18, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", price: 119000, category: "Self-help", image: cover("subtle-art") },

  // SCIENCE
  { id: 19, title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", price: 145000, category: "Science", image: cover("sapiens") },
  { id: 20, title: "Homo Deus", author: "Yuval Noah Harari",            price: 139000, category: "Science", image: cover("homo-deus") },
  { id: 21, title: "Tư Duy Nhanh và Chậm", author: "Daniel Kahneman",   price: 130000, category: "Science", image: cover("thinking-fast-slow") },
  { id: 22, title: "Giải Mã Não Bộ", author: "David Eagleman",          price: 125000, category: "Science", image: cover("brain-eagleman") },
  { id: 23, title: "Vũ Trụ Trong Vỏ Hạt Dẻ", author: "Stephen Hawking", price: 149000, category: "Science", image: cover("universe-nutshell") },
  { id: 24, title: "The Selfish Gene", author: "Richard Dawkins",       price: 135000, category: "Science", image: cover("selfish-gene") },
  { id: 25, title: "Brief Answers to Big Questions", author: "Stephen Hawking", price: 145000, category: "Science", image: cover("brief-answers") },

  // EDUCATION / TECH ED
  { id: 26, title: "Tâm Lý Học Thành Công", author: "Carol Dweck",      price: 109000, category: "Education", image: cover("mindset-vn") },
  { id: 27, title: "Học Tập Thông Minh", author: "Barbara Oakley",      price: 99000,  category: "Education", image: cover("learn-smarter") },
  { id: 28, title: "Teach Like a Champion", author: "Doug Lemov",       price: 135000, category: "Education", image: cover("teach-like-champion") },
  { id: 29, title: "Mindset", author: "Carol Dweck",                    price: 120000, category: "Education", image: cover("mindset") },
  { id: 30, title: "The Pragmatic Programmer", author: "Andrew Hunt",   price: 199000, category: "Education", image: cover("pragmatic-programmer") },
  { id: 31, title: "Clean Code", author: "Robert C. Martin",            price: 189000, category: "Education", image: cover("clean-code") },
  { id: 32, title: "Effective Learning", author: "Peter Brown",          price: 95000,  category: "Education", image: cover("effective-learning") },

  // FICTION
  { id: 33, title: "Nhà Giả Kim", author: "Paulo Coelho",               price: 89000,  category: "Fiction", image: cover("alchemist") },
  { id: 34, title: "Không Gia Đình", author: "Hector Malot",            price: 75000,  category: "Fiction", image: cover("sans-famille") },
  { id: 35, title: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry",   price: 69000,  category: "Fiction", image: cover("petit-prince") },
  { id: 36, title: "Kẻ Trộm Sách", author: "Markus Zusak",              price: 99000,  category: "Fiction", image: cover("book-thief") },
  { id: 37, title: "Harry Potter và Hòn Đá Phù Thủy", author: "J.K. Rowling", price: 180000, category: "Fiction", image: cover("hp-stone") },
  { id: 38, title: "Cuốn Theo Chiều Gió", author: "Margaret Mitchell",  price: 145000, category: "Fiction", image: cover("gone-with-wind") },
  { id: 39, title: "1984", author: "George Orwell",                     price: 119000, category: "Fiction", image: cover("orwell-1984") },
  { id: 40, title: "To Kill a Mockingbird", author: "Harper Lee",       price: 115000, category: "Fiction", image: cover("mockingbird") },
  { id: 41, title: "Pride and Prejudice", author: "Jane Austen",        price: 99000,  category: "Fiction", image: cover("pride-prejudice") },

  // TECHNOLOGY
  { id: 42, title: "Code Complete", author: "Steve McConnell",          price: 215000, category: "Technology", image: cover("code-complete") },
  { id: 43, title: "Design Patterns", author: "Erich Gamma",            price: 230000, category: "Technology", image: cover("design-patterns") },
  { id: 44, title: "Introduction to Algorithms", author: "Thomas H. Cormen", price: 245000, category: "Technology", image: cover("clrs") },
  { id: 45, title: "Python Crash Course", author: "Eric Matthes",       price: 179000, category: "Technology", image: cover("python-crash") },
  { id: 46, title: "JavaScript: The Good Parts", author: "Douglas Crockford", price: 159000, category: "Technology", image: cover("js-good-parts") },
  { id: 47, title: "Clean Architecture", author: "Robert C. Martin",    price: 199000, category: "Technology", image: cover("clean-architecture") },

  // HISTORY
  { id: 48, title: "Guns, Germs and Steel", author: "Jared Diamond",    price: 139000, category: "History", image: cover("guns-germs-steel") },
  { id: 49, title: "The Silk Roads", author: "Peter Frankopan",         price: 129000, category: "History", image: cover("silk-roads") },
  { id: 50, title: "Lược Sử Thế Giới", author: "E. H. Gombrich",        price: 119000, category: "History", image: cover("little-history-world") },
  { id: 51, title: "A Short History of Nearly Everything", author: "Bill Bryson", price: 145000, category: "History", image: cover("short-history-everything") },

  // PSYCHOLOGY
  { id: 52, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 130000, category: "Psychology", image: cover("thinking-fast-slow-2") },
  { id: 53, title: "Influence", author: "Robert B. Cialdini",           price: 115000, category: "Psychology", image: cover("influence") },
  { id: 54, title: "Drive", author: "Daniel H. Pink",                   price: 119000, category: "Psychology", image: cover("drive") },
  { id: 55, title: "Flow", author: "Mihaly Csikszentmihalyi",           price: 125000, category: "Psychology", image: cover("flow") },
  { id: 56, title: "Predictably Irrational", author: "Dan Ariely",      price: 125000, category: "Psychology", image: cover("predictably-irrational") },

  // ART & DESIGN
  { id: 57, title: "Steal Like an Artist", author: "Austin Kleon",      price: 89000,  category: "Art", image: cover("steal-like-artist") },
  { id: 58, title: "Show Your Work!", author: "Austin Kleon",           price: 95000,  category: "Art", image: cover("show-your-work") },
  { id: 59, title: "The War of Art", author: "Steven Pressfield",       price: 99000,  category: "Art", image: cover("war-of-art") },
  { id: 60, title: "Creative Confidence", author: "Tom Kelley",         price: 99000,  category: "Art", image: cover("creative-confidence") },

  // MORE FICTION
  { id: 61, title: "Sherlock Holmes", author: "Arthur Conan Doyle",     price: 99000,  category: "Fiction", image: cover("sherlock-holmes") },
  { id: 62, title: "The Great Gatsby", author: "F. Scott Fitzgerald",   price: 89000,  category: "Fiction", image: cover("great-gatsby") },
  { id: 63, title: "The Hobbit", author: "J.R.R. Tolkien",              price: 145000, category: "Fiction", image: cover("the-hobbit") },
  { id: 64, title: "Lord of the Rings", author: "J.R.R. Tolkien",       price: 195000, category: "Fiction", image: cover("lotr") },
  { id: 65, title: "Animal Farm", author: "George Orwell",              price: 85000,  category: "Fiction", image: cover("animal-farm") },
  { id: 66, title: "The Catcher in the Rye", author: "J.D. Salinger",   price: 89000,  category: "Fiction", image: cover("catcher-rye") },
  { id: 67, title: "Life of Pi", author: "Yann Martel",                 price: 99000,  category: "Fiction", image: cover("life-of-pi") },

  // ECONOMICS
  { id: 68, title: "Freakonomics", author: "Steven D. Levitt",          price: 115000, category: "Economics", image: cover("freakonomics") },
  { id: 69, title: "The Wealth of Nations", author: "Adam Smith",       price: 139000, category: "Economics", image: cover("wealth-of-nations") },
  { id: 70, title: "Principles of Economics", author: "N. Gregory Mankiw", price: 159000, category: "Economics", image: cover("mankiw") },

  // EXTRA (để đủ 65+)
  { id: 71, title: "The Innovator's Dilemma", author: "Clayton Christensen", price: 149000, category: "Business", image: cover("innovator-dilemma") },
  { id: 72, title: "Start With Why", author: "Simon Sinek",             price: 129000, category: "Business", image: cover("start-with-why") },
  { id: 73, title: "The Phoenix Project", author: "Gene Kim",           price: 159000, category: "Technology", image: cover("phoenix-project") },
  { id: 74, title: "Rework", author: "Jason Fried",                     price: 119000, category: "Business", image: cover("rework") },
  { id: 75, title: "Algorithms to Live By", author: "Brian Christian",  price: 139000, category: "Science", image: cover("algorithms-live-by") },
];

/* ========== Giả lập API ========== */
const Api = {
  getBooks() {
    return Promise.resolve(BOOKS.slice());
  },
  getCategories() {
    const cats = Array.from(new Set(BOOKS.map(b => b.category)));
    return Promise.resolve(cats);
  },
  getBookById(id) {
    return Promise.resolve(BOOKS.find(b => b.id === id));
  }
};

window.Api = Api;
window.BOOKS = BOOKS;
