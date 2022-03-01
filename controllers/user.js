const { response, request } = require( 'express' );

const userGet = ( req = request, res = response ) => {
  const { q } = req.query;
  res.json({
    msg: 'get API - controlador',
    q
  });
}

const userPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'put API - controlador',
    id
  });
}

const userPost = (req, res = response) => {
  const { name, age } = req.body;

  res.json({
    msg: 'post API - controlador',
    name,
    age
  });
}

const userDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - controlador'
  });
}
const userPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  });
}

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch
}