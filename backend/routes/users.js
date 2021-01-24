const express = require('express');
const router = express.Router(); // creación de la instancia de enrutamiento

const users = [];

// products.push({id: 1, name: 'apple'}, {id: 2, name: 'banana'}, {id: 3, name: 'orange'})

router.get('/users', (req, res) => {
    res.send(users)
  });

module.exports = router; // exportación del enrutador
