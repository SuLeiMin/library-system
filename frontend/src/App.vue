<template>
  <div>
    <h1>図書館システム</h1>
    <!-- 📚 本の一覧 -->
    <section>
  <h2>一覧</h2>
  <!-- 🔍 検索フォーム -->
  <input v-model="searchQuery" placeholder="タイトルまたは著者で検索" />
  <button @click="searchBooks">検索</button>
  <button @click="clearSearch">クリア</button>

  <br /><br /> <!-- 🔽 ここで改行を追加 -->

  <table border="1" style="width: 100%; border-collapse: collapse;">
    <thead style="background-color: #f0f0f0;">
      <tr>
        <th>ID</th>
        <th>タイトル</th>
        <th>著者</th>
        <th>年</th>
        <th>ジャンル</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in filteredBooks" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.year }}</td>
        <td>{{ book.genre }}</td>
        <td>
          <button @click="viewBook(book)">詳細</button>
          <button @click="selectBook(book)">編集</button>
          <button @click="deleteBook(book.id)">削除</button>
     </td>
      </tr>
    </tbody>
  </table>
</section>
    <!-- ➕ 新規作成 -->
    <section>
      <h2>新規作成</h2>
      <input v-model="newBook.title" placeholder="タイトル" />
      <input v-model="newBook.author" placeholder="著者" />
      <input v-model="newBook.year" placeholder="年" />
      <input v-model="newBook.genre" placeholder="ジャンル" />
      <button @click="addBook">新規</button>
    </section>

    <!-- ✏️ 編集 -->
    <section v-if="selectedId">
      <h2>編集</h2>
      <input v-model="editBookData.title" placeholder="タイトル" />
      <input v-model="editBookData.author" placeholder="著者" />
      <input v-model="editBookData.year" placeholder="年" />
      <input v-model="editBookData.genre" placeholder="ジャンル" />
      <button @click="editBook">保存</button>
      <button @click="cancelEdit">キャンセル</button>
    </section>

    <!-- 🔍 詳細表示 -->
    <section v-if="viewingBook">
      <h2>詳細一覧</h2>
      <p><strong>Title:</strong> {{ viewingBook.title }}</p>
      <p><strong>Author:</strong> {{ viewingBook.author }}</p>
      <p><strong>Year:</strong> {{ viewingBook.year }}</p>
      <p><strong>Genre:</strong> {{ viewingBook.genre }}</p>
      <button @click="viewingBook = null">Close</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      newBook: { title: '', author: '', year: '', genre: '' },
      editBookData: { title: '', author: '', year: '', genre: '' },
      selectedId: null,
      viewingBook: null,
      searchQuery: '',
      filteredBooks: []
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/books`)
        .then(res => {
          this.books = res.data;
          this.filteredBooks = res.data;
        });
    },
    addBook() {
      axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/books`, this.newBook)
        .then(() => {
          this.newBook = { title: '', author: '', year: '', genre: '' };
          this.fetchBooks();
        });
    },
    selectBook(book) {
      this.selectedId = book.id;
      this.editBookData = { ...book };
    },
    editBook() {
      axios.put(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/books/${this.selectedId}`, this.editBookData)
        .then(() => {
          this.cancelEdit();
          this.fetchBooks();
        });
    },
    cancelEdit() {
      this.selectedId = null;
      this.editBookData = { title: '', author: '', year: '', genre: '' };
    },
    deleteBook(id) {
      axios.delete(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/books/${id}`)
        .then(() => {
          if (this.selectedId === id) this.cancelEdit();
          this.fetchBooks();
        });
    },
    viewBook(book) {
      this.viewingBook = book;
    },
    searchBooks() {
      const q = this.searchQuery.toLowerCase();
      this.filteredBooks = this.books.filter(
        book =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
      );
    },
    clearSearch() {
      this.searchQuery = '';
      this.filteredBooks = this.books;
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-top: 1rem;
}

section {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem auto;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

section h2 {
  color: #34495e;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  margin: 0.3rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:nth-child(1) {
  background-color: #3498db;
  color: white;
}

button:nth-child(2) {
  background-color: #2ecc71;
  color: white;
}

button:nth-child(3) {
  background-color: #e74c3c;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:hover {
  background-color: #f1f1f1;
}

li button {
  margin-left: 0.3rem;
  font-size: 0.9rem;
}
</style>

