// Login functionality
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email === 'rohankumarchaudhry@lltinfotech.com' && password === 'rohan@lltinfotech') {
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Profile location
if (document.getElementById('location')) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            document.getElementById('location').innerText = `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`;
            // Initialize map if API key is provided
            if (typeof google !== 'undefined') {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat, lng },
                    zoom: 15
                });
                new google.maps.Marker({
                    position: { lat, lng },
                    map: map
                });
            } else {
                document.getElementById('map').innerHTML = '<p>Map requires Google Maps API key.</p>';
            }
        }, function(error) {
            document.getElementById('location').innerText = 'Unable to retrieve location: ' + error.message;
        });
    } else {
        document.getElementById('location').innerText = 'Geolocation not supported by this browser.';
    }
}

// Attendance
if (document.getElementById('attendanceForm')) {
    document.getElementById('attendanceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;
        const notes = document.getElementById('notes').value;
        const attendance = { date, status, notes };
        let attendances = JSON.parse(localStorage.getItem('attendances')) || [];
        // Check if date already exists
        const existingIndex = attendances.findIndex(att => att.date === date);
        if (existingIndex >= 0) {
            attendances[existingIndex] = attendance;
        } else {
            attendances.push(attendance);
        }
        localStorage.setItem('attendances', JSON.stringify(attendances));
        displayAttendance();
        alert('Attendance submitted successfully!');
        // Reset form
        document.getElementById('attendanceForm').reset();
    });

    function displayAttendance() {
        const tbody = document.getElementById('attendanceList');
        tbody.innerHTML = '';
        const attendances = JSON.parse(localStorage.getItem('attendances')) || [];
        attendances.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
        attendances.forEach(att => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${att.date}</td>
                <td>${att.status.charAt(0).toUpperCase() + att.status.slice(1)}</td>
                <td>${att.notes || 'N/A'}</td>
            `;
            tbody.appendChild(row);
        });
    }
    displayAttendance();
}