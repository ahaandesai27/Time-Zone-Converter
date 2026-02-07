// Load all available timezones
async function loadTimezones() {
    const areas = ['Africa', 'America', 'Antarctica', 'Asia', 'Atlantic', 'Australia', 'Europe', 'Pacific'];
    const container = document.getElementById('timezoneContainer');

    try {
        container.innerHTML = '';

        for (const area of areas) {
            // Create area section
            const areaDiv = document.createElement('div');
            areaDiv.className = 'col-12 mb-4';

            // Get timezones for this area
            const response = await axios.get(`https://worldtimeapi.org/api/timezone/${area}`);
            const timezones = response.data;

            areaDiv.innerHTML = `
                        <div class="timezone-card card bg-secondary h-100">
                            <div class="card-header bg-info">
                                <h4 class="card-title mb-0 text-dark" style="font-weight: 600;">
                                    ${area} (${timezones.length} timezones)
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    ${timezones.map(timezone => {
                const location = timezone.slice(timezone.indexOf('/') + 1).replace(/_/g, ' ');
                return `
                                            <div class="col-md-3 col-sm-4 col-6 mb-2">
                                                <span class="badge bg-dark text-light p-2 w-100" style="font-size: 14px;">
                                                    ${location}
                                                </span>
                                            </div>
                                        `;
            }).join('')}
                                </div>
                            </div>
                        </div>
                    `;

            container.appendChild(areaDiv);
        }

    } catch (error) {
        container.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">
                            <h4>Error Loading Timezones</h4>
                            <p>Unable to fetch timezone data from World Time API. Please check your internet connection and try again.</p>
                            <button class="btn btn-outline-danger" onclick="loadTimezones()">Retry</button>
                        </div>
                    </div>
                `;
        console.error('Error loading timezones:', error);
    }
}

// Load timezones when page loads
document.addEventListener('DOMContentLoaded', loadTimezones);