const API_BASE = "https://ujobsindia.com/aayusha-backend/public/api/v1";

async function runTests() {
    console.log("🚀 Starting Real-World API Integration Tests for Ujobs India (Native Fetch)...\n");

    const tests = [
        { name: "Fetch Categories", endpoint: "/work-types" },
        { name: "Fetch Locations", endpoint: "/locations" },
        { name: "Fetch Jobs (Paginated)", endpoint: "/job-all-pagination" },
        { name: "Fetch Banners", endpoint: "/banner" }
    ];

    for (const test of tests) {
        try {
            console.log(`Testing: ${test.name} [${test.endpoint}]...`);
            const response = await fetch(`${API_BASE}${test.endpoint}`, {
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(`✅ SUCCESS: ${test.name}`);
                
                if (test.endpoint === "/job-all-pagination") {
                    const jobs = data.data;
                    console.log(`   - Found ${jobs.length} jobs in first page.`);
                    if (jobs.length > 0) {
                        console.log(`   - Sample Job: "${jobs[0].job_title}" in ${jobs[0].location?.location_name || 'N/A'}`);
                    }
                }

                if (test.endpoint === "/work-types") {
                    console.log(`   - Found ${data.length} job categories.`);
                }
            } else {
                console.log(`❌ FAILED: ${test.name} (Status: ${response.status})`);
            }
        } catch (error) {
            console.log(`❌ ERROR: ${test.name} - ${error.message}`);
        }
        console.log("--------------------------------------------------");
    }
}

runTests();
