const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const signup = async (req, res) => {
  // req = from front end
  // res = to front end

  // email,name,password = req.body
  // distructuring
  console.log('signup hoche');

  let { email, name, password, type } = req.body;
  console.log(req.body, email, name, password, type);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //query databse
    let user = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword, type: type },
    });

    // the token will be save in cookies (to see if signed in or not)
    const token = jwt.sign(
      { email: user.email, id: user.id, type: user.type, role: user.role },
      SECRET_KEY,
    );

    res.status(201).json({ user: user, token: token });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      { email: user.email, id: user.id, type: user.type, role: user.role },
      SECRET_KEY,
    );

    res
      .status(200)
      .json({ message: 'Signin successful', user: user, toten: token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
};
module.exports = { signin, signup };
