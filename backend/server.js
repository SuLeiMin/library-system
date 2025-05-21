const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

// 全書籍を取得
app.get('/books', (req, res) => {
  db.query('SELECT * FROM book', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 書籍を追加
app.post('/books', (req, res) => {
  const { title, author, year, genre } = req.body;
  console.log("受け取ったデータ:", title, author, year, genre);

  db.query(
    'INSERT INTO book (title, author, year, genre) VALUES (?, ?, ?, ?)',
    [title, author, year, genre],
    (err, results) => {
      if (err) {
        console.error("DB挿入エラー:", err);
        return res.status(500).json({ error: err });
      }
      console.log("挿入成功:", results);
      res.json({ id: results.insertId, title, author, year, genre });
    }
  );
});

// 書籍を編集
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, year, genre } = req.body;

  db.query(
    'UPDATE book SET title = ?, author = ?, year = ?, genre = ? WHERE id = ?',
    [title, author, year, genre, id],
    (err, results) => {
      if (err) {
        console.error("DB更新エラー:", err);
        return res.status(500).json({ error: err });
      }
      res.json({ message: '更新成功', id });
    }
  );
});

// 書籍を削除
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM book WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error("DB削除エラー:", err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: '削除成功', id });
  });
});

// サーバー起動
app.listen(3001, () => {
  //console.log('Server running on http://localhost:3001');
  console.log(`Listening on port ${PORT}`);
});
