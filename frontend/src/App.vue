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
      