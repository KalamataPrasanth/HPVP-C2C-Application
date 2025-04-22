import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Custom metric to track slow responses
let slowRequests = new Trend('slow_requests');

export let options = {
  stages: [
    { duration: '10s', target: 100 }, // Ramp-up to 100 users in 10 seconds
    { duration: '50s', target: 100 }, // Stay at 100 users for 50 seconds
  ],
};

export default function () {
  // let res = http.get('http://localhost:5000/api/products'); // Replace with actual API URL
  let res = http.get('http://localhost:5000/api/wishlist');

  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 200ms': (r) => {
      let isFast = r.timings.duration < 200;
      if (!isFast) {
        slowRequests.add(r.timings.duration); // Track slow requests
        console.log(`⚠️ Slow request: ${r.timings.duration}ms - ${res.url}`);
      }
      return isFast;
    },
  });

  sleep(1);
}
