const express = require('express');
const mysql = require('mysql2');
const app = express();

const pool = mysql.createPool({
  connectionLimit: 4,
  host: 'localhost',
  user: 'root',
  database: 'ChatBotTests',
  password: ''
});

// Получить все элементы
app.get('/getAllItems', (req, res) => {
  pool.query('SELECT * FROM Items', (err, results) => {
    if (err) {
      res.json(null);
    } else {
      res.json(results);
    }
  });
});

// Добавить элемент
app.post('/addItem', (req, res) => {
  const { name, desc } = req.query;
  if (!name || !desc) return res.json(null);

  pool.query('INSERT INTO Items (name, `desc`) VALUES (?, ?)', [name, desc], (err, result) => {
    if (err) {
      return res.json(null);
    }
    
    pool.query('SELECT * FROM Items WHERE id = ?', [result.insertId], (err2, items) => {
      if (err2) {
        res.json(null);
      } else {
        res.json(items[0]);
      }
    });
  });
});

// Удалить элемент
app.post('/deleteItem', (req, res) => {
  const { id } = req.query;
  if (!id || isNaN(Number(id))) return res.json(null);

  pool.query('DELETE FROM Items WHERE id = ?', [id], (err) => {
    if (err) {
      res.json(null);
    } else {
      res.json({});
    }
  });
});

// Обновить элемент
app.post('/updateItem', (req, res) => {
  const { id, name, desc } = req.query;
  if (!id || !name || !desc || isNaN(Number(id))) return res.json(null);

  pool.query('UPDATE Items SET name = ?, `desc` = ? WHERE id = ?', [name, desc, id], (err, result) => {
    if (err) {
      return res.json(null);
    }
    if (result.affectedRows === 0) {
      return res.json({});
    }
    pool.query('SELECT * FROM Items WHERE id = ?', [id], (err2, items) => {
      if (err2) {
        res.json(null);
      } else {
        res.json(items[0]);
      }
    });
  });
});

app.listen(3000);
