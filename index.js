require('dotenv').config()

const express = require('express');
const request = require('request-promise-native');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/', async (req, res) => {
    const { email, token, fullName, membershipNum, copies } = req.body;

    if (!email || !token || !fullName || !copies) {
        return res.status(400).json({ message: 'Invalid body' });
    }

    if (!Number.isInteger(copies)) {
        return res.status(400).json({ message: 'copies must be an integer' });
    }

    try {
        const options = {
            method: 'POST',
            uri: 'https://docs.google.com/forms/u/2/d/e/1FAIpQLScGbSItfnh6m33Ze9TD-jTdY1u3YY6JBVcRN8-hhSobBaK92g/formResponse',
            formData: {
                "entry.1412771207":	copies,
                "entry.701896016": email,
                "entry.885444724": membershipNum,
                "entry.993158475": fullName
            }
        }

        const results = await stripe.charges.create({
            amount: calculateCharge(copies, membershipNum),
            currency: 'cad',
            description: `Anthology (${membershipNum ? 'Member' : 'Non-member'}) x${copies}`,
            source: token,
            receipt_email: email
        });

        console.log(`Charge successful for ${email}`);
        await request(options);

        console.log(`Submitted payment of ${results.amount} from ${email} to Google Forms`);

        res.json({ message: 'success' });
    } catch (err) {
        console.log('An unexpected error occurred');
        console.log(err);

        res.status(500).json(err);
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

function calculateCharge(copies, membershipNum) {
    return (membershipNum ? 2000 : 2400) * parseInt(copies);
}
