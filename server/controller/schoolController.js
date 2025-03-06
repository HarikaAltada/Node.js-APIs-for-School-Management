const db = require('../config/db');


// Haversine Formula to calculate distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// ✅ Add a New School
const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        const [result] = await db.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ List Schools Sorted by Proximity
const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Invalid latitude or longitude' });
        }

        const [results] = await db.query('SELECT * FROM schools');

        // Parse latitude and longitude before calculation
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = results.map(school => ({
            ...school,
            latitude: parseFloat(school.latitude), // Ensure numbers
            longitude: parseFloat(school.longitude),
            distance: calculateDistance(userLat, userLon, parseFloat(school.latitude), parseFloat(school.longitude))
        })).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addSchool, listSchools };
