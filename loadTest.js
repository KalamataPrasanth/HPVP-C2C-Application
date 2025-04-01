import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 100, // Virtual Users (simulate 50 users at once)
    duration: '30s', // Test for 30 seconds
};

export default function () {
    let res = http.get('http://localhost:5000/api/products'); // Replace with your API endpoint

    check(res, {
        'is status 200': (r) => r.status === 200,
        'response time < 200ms': (r) => r.timings.duration < 200,
    });

    sleep(1); // Wait 1 second between requests
}
