const books = [
  {
    id: 1,
    title: 'Qadrdon yillar',
    author: 'Abdulla Qodiriy',
    genre: 'Badiiy adabiyot',
    year: 1928,
    description: 'O‘zbek adabiyotining klassik asari bo‘lib, maishat va jamiyat hayotini yoritadi.',
    status: 'Mavjud',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    title: 'Ikki eshik orasi',
    author: 'Said Ahmad',
    genre: 'Tarixiy adabiyot',
    year: 2015,
    description: 'Tarixiy voqealar va insoniy his-tuyg‘ularga boy, kuchli syujetli roman.',
    status: 'Band',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'Matematika asoslari',
    author: 'A. Rahimov',
    genre: 'Ilmiy adabiyot',
    year: 2022,
    description: 'O‘quvchilar va talabalarga mo‘ljallangan matematik tushunchalarni og‘zaki va vizual ko‘rsatish.',
    status: 'Mavjud',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    title: 'Yulduzlar yoshi',
    author: 'N. O‘rinboyeva',
    genre: 'Fantastika',
    year: 2021,
    description: 'Koinotga sayohat, dostlik va jasorat haqidagi qiziqarli hikoya.',
    status: 'Vaqtincha mavjud emas',
    image: 'https://images.unsplash.com/photo-1516979187454-937abbff6a2e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    title: 'Sarguzashtdagi tun',
    author: 'B. Karimov',
    genre: 'Sarguzasht',
    year: 2019,
    description: 'Jangari voqealar, qiyinchiliklar va qahramonlik bilan to‘la tasvir.',
    status: 'Mavjud',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    title: 'Ichkaridagi ovoz',
    author: 'M. Toshpulatova',
    genre: 'Psixologiya',
    year: 2020,
    description: 'Inson ruhiy holati va shaxsiy o‘sishga oid chuqur tahlillar.',
    status: 'Mavjud',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    title: 'Bola va quyosh',
    author: 'G. Mavlonova',
    genre: 'Bolalar adabiyoti',
    year: 2023,
    description: 'Bolalar uchun yo‘l qo‘yilgan quvnoq va ma’naviy hikoyalar to‘plami.',
    status: 'Mavjud',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    title: 'Aql va ma’rifat',
    author: 'I. Boboev',
    genre: 'Falsafa',
    year: 2018,
    description: 'Falsafiy fikrlar va hayotiy tajribalarga oid tanlangan maqolalar.',
    status: 'Band',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
  }
];

const state = {
  search: '',
  genre: 'Barchasi',
  sortBy: 'title',
  onlyAvailable: false,
  selectedBook: null
};

const booksGrid = document.querySelector('#booksGrid');
const searchInput = document.querySelector('#bookSearch');
const genreButtons = document.querySelectorAll('.genre-btn');
const sortSelect = document.querySelector('#sortBooks');
const availabilityToggle = document.querySelector('#availableOnly');
const modal = document.querySelector('#bookModal');
const modalContent = document.querySelector('#modalContent');

function getStatusClass(status) {
  if (status === 'Mavjud') return 'available';
  if (status === 'Band') return 'busy';
  return 'unavailable';
}

function renderBooks() {
  let filteredBooks = [...books];

  if (state.search) {
    const term = state.search.toLowerCase();
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
    );
  }

  if (state.genre !== 'Barchasi') {
    filteredBooks = filteredBooks.filter((book) => book.genre === state.genre);
  }

  if (state.onlyAvailable) {
    filteredBooks = filteredBooks.filter((book) => book.status === 'Mavjud');
  }

  filteredBooks.sort((a, b) => {
    if (state.sortBy === 'year') {
      return b.year - a.year;
    }
    return a.title.localeCompare(b.title, 'uz');
  });

  if (!booksGrid) return;

  booksGrid.innerHTML = filteredBooks.map((book) => `
    <article class="book-card catalog-book">
      <img src="${book.image}" alt="${book.title}" class="book-image" />
      <div class="card-body">
        <div class="meta-row">
          <span class="tag">${book.genre}</span>
          <span>${book.year}</span>
        </div>
        <h3>${book.title}</h3>
        <p><strong>Muallif:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <span class="book-status ${getStatusClass(book.status)}">${book.status}</span>
        <div style="margin-top: 16px;">
          <button class="btn btn-primary" data-book-id="${book.id}">Batafsil ma'lumot</button>
        </div>
      </div>
    </article>
  `).join('');

  booksGrid.querySelectorAll('[data-book-id]').forEach((button) => {
    button.addEventListener('click', function () {
      const id = Number(this.dataset.bookId);
      openBookModal(id);
    });
  });
}

function openBookModal(bookId) {
  const book = books.find((item) => item.id === bookId);
  if (!book || !modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-header">
      <h3>${book.title}</h3>
      <button class="modal-close" type="button" aria-label="Yopish">&times;</button>
    </div>
    <div class="modal-body">
      <div class="modal-figure">
        <img src="${book.image}" alt="${book.title}" />
        <div>
          <div class="modal-meta">
            <span>Muallif: ${book.author}</span>
            <span>Janr: ${book.genre}</span>
            <span>Yil: ${book.year}</span>
          </div>
          <p>${book.description}</p>
          <p><strong>Holat:</strong> <span class="book-status ${getStatusClass(book.status)}">${book.status}</span></p>
          <button class="btn btn-primary" type="button">Kitobni ko‘rish</button>
        </div>
      </div>
    </div>
  `;

  const closeBtn = modalContent.querySelector('.modal-close');
  closeBtn?.addEventListener('click', closeBookModal);
  modal.classList.add('open');
}

function closeBookModal() {
  if (modal) modal.classList.remove('open');
}

if (searchInput) {
  searchInput.addEventListener('input', function (event) {
    state.search = event.target.value.trim();
    renderBooks();
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', function (event) {
    state.sortBy = event.target.value;
    renderBooks();
  });
}

if (availabilityToggle) {
  availabilityToggle.addEventListener('change', function (event) {
    state.onlyAvailable = event.target.checked;
    renderBooks();
  });
}

genreButtons.forEach((button) => {
  button.addEventListener('click', function () {
    state.genre = this.dataset.genre || 'Barchasi';
    genreButtons.forEach((item) => item.classList.toggle('active', item === this));
    renderBooks();
  });
});

if (modal) {
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeBookModal();
  });
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && modal) {
    closeBookModal();
  }
});

renderBooks();
