require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Shreyas Academy backend running with Fast2SMS integration');
});

app.post('/api/signup', async (req, res) => {
  const { studentPhone, parentPhone, name } = req.body;

  const sendSMS = async (phone, text) => {
    try {
      const response = await axios.post(
        'https://www.fast2sms.com/dev/bulkV2',
        {
          route: 'v3',
          message: text,
          language: 'english',
          numbers: phone,
        },
        {
          headers: {
            'authorization': process.env.FAST2SMS_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  try {
    // Send to student
    await sendSMS(
      studentPhone,
      `Hello ${name}, thank you for signing up at Shreyas Academy!`
    );

    // Send to parent
    if (parentPhone) {
      await sendSMS(
        parentPhone,
        `Your child ${name} has registered successfully at Shreyas Academy.`
      );
    }

    res.status(200).json({ message: 'Signup successful, SMS sent' });
  } catch (error) {
    console.error('SMS sending failed:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Signup succeeded but SMS failed', details: error?.response?.data || error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
