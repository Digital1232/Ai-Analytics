document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Toast Notification System
    // ----------------------------------------------------
    const createToastContainer = () => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    };

    window.showToast = (title, message, type = 'info') => {
        const container = createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconClass = 'fa-info-circle toast-info-icon';
        if (type === 'success') iconClass = 'fa-check-circle toast-success-icon';
        if (type === 'error') iconClass = 'fa-exclamation-circle toast-error-icon';

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;
        
        container.appendChild(toast);

        // Remove toast after animation
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.4s ease-out forwards';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    };

    // ----------------------------------------------------
    // 2. Login Flow (index.html)
    // ----------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    const errorBanner = document.getElementById('loginErrorBanner');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = loginForm.querySelector('input[type="email"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            if (!emailInput || !passwordInput) return;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            if (errorBanner) errorBanner.style.display = 'none';

            setTimeout(() => {
                if (emailInput.value.trim() === 'admin@vilpowernexus.com' && passwordInput.value === 'admin123') {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('username', 'John Carter');
                    window.showToast('Success', 'Access granted. Welcome back, John!', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Sign In';
                    passwordInput.value = '';
                    if (errorBanner) {
                        errorBanner.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Invalid email or password. Use <strong>admin@vilpowernexus.com</strong> / <strong>admin123</strong>';
                        errorBanner.style.display = 'block';
                    } else {
                        window.showToast('Authentication Failed', 'Invalid credentials. Use admin@vilpowernexus.com / admin123', 'error');
                    }
                }
            }, 800);
        });
    }

    // ----------------------------------------------------
    // 3. Multi-Client Mock Databases (14 clients)
    // ----------------------------------------------------
    const clientNames = [
        "VilPower Ltd", "Nexus Technologies", "Zenith Retail", "Apex Learning", 
        "Acuity Brands", "BlueWave Energy", "Quantum Finance", "Summit Healthcare", 
        "Vanguard Logistics", "Starlight Media", "Titan Construct", "GreenGrowth Agri", 
        "Pinnacle Consult", "Horizon Hotels"
    ];

    const generateClientData = (index) => {
        const clientName = clientNames[index];
        const seed = index * 10;
        
        // Multiplier to create unique data scales
        const scale = 0.5 + (index % 5) * 0.4; // between 0.5x and 2.1x scale
        
        return {
            name: clientName,
            stats: {
                pageviews: (50.8 * scale).toFixed(1) + "K", // Facebook Reach
                pageviewsChange: (20 + (seed % 15)).toFixed(1) + "% ↗",
                pageviewsPositive: true,
                users: (23.6 * scale).toFixed(1) + "K", // Instagram Engagement
                usersChange: (10 + (seed % 8)).toFixed(1) + "% ↘",
                usersPositive: false,
                signups: Math.round(756 * scale), // YouTube Subscribers
                signupsChange: (2 + (seed % 5)).toFixed(1) + "% ↗",
                signupsPositive: true,
                subs: "$" + (2.3 * scale).toFixed(1) + "K", // Ad Spend
                subsChange: (8 + (seed % 10)).toFixed(1) + "% ↗",
                subsPositive: true
            },
            revenueScale: scale,
            revenueVal: "$" + (240.8 * scale).toFixed(1) + "K",
            revenueChange: (20 + (seed % 12)).toFixed(1) + "% ↗",
            profitVal: "$" + (144.6 * scale).toFixed(1) + "K",
            profitChange: (25 + (seed % 9)).toFixed(1) + "% ↗",
            sessionsVal: Math.round(400 * scale),
            sessionsChange: (14 + (seed % 7)).toFixed(1) + "% ↗",
            
            // Charts Data
            chartRevenue: [30*scale, 50*scale, 75*scale, 70*scale, 110*scale, 100*scale, 140*scale, 130*scale, 170*scale, 150*scale, 200*scale, 240.8*scale],
            chartExpenses: [12*scale, 25*scale, 40*scale, 35*scale, 65*scale, 60*scale, 85*scale, 75*scale, 100*scale, 85*scale, 110*scale, 130*scale],
            chartProfit: [38*scale, 32*scale, 22*scale, 40*scale, 70*scale, 80*scale, 95*scale, 78*scale, 110*scale, 120*scale, 85*scale, 144.6*scale],
            chartSessions: [130*scale, 110*scale, 95*scale, 160*scale, 220*scale, 190*scale, 280*scale, 250*scale, 340*scale, 390*scale, 360*scale, 400*scale],
            chartDevice: [50 + (index % 10), 35 - (index % 8), 10 + (index % 4), 5 - (index % 3)], // Desktop, Mobile, Tablet, Smart TV
            chartFunnel: [Math.round(400000*scale), Math.round(100000*scale), Math.round(20000*scale), Math.round(7000*scale), Math.round(2000*scale)],

            // Overview Table
            overviewCampaigns: [
                { name: "Google Search Ads", source: "Google PPC", views: Math.round(12450*scale), conv: Math.round(1240*scale), bounce: "41.2%", roi: "+" + (200 + seed * 3) + "%", status: "active" },
                { name: "Meta Lead Gen", source: "Facebook Ad", views: Math.round(8920*scale), conv: Math.round(756*scale), bounce: "52.8%", roi: "+" + (150 + seed * 2) + "%", status: "active" },
                { name: "Newsletter Campaign", source: "Email blast", views: Math.round(4120*scale), conv: Math.round(502*scale), bounce: "28.5%", roi: "+" + (280 + seed * 4) + "%", status: "paused" },
                { name: "LinkedIn Executive Outreach", source: "LinkedIn InMail", views: Math.round(2500*scale), conv: Math.round(145*scale), bounce: "63.1%", roi: (seed % 2 === 0 ? "+" : "-") + (seed + 5) + "%", status: "completed" }
            ],

            // CRM Leads
            crmLeads: [
                { name: "Alice Smith", email: "alice.smith@example.com", source: "Google Search", score: 94 - (index % 5), date: "May 25, 2026", status: "Warm" },
                { name: "Bobby Miller", email: "bobby.miller@admissions.edu", source: "Organic Traffic", score: 68 + (index % 7), date: "May 24, 2026", status: "Contacted" },
                { name: "Clara Davis", email: "clara@davistechnologies.com", source: "LinkedIn Outreach", score: 85 - (index % 3), date: "May 23, 2026", status: "Warm" },
                { name: "David Kovic", email: "david@kovicdesign.co", source: "Meta Campaigns", score: 32 + (index % 10), date: "May 20, 2026", status: "Cold" },
                { name: "Emma Watson", email: "emma.watson@enterprise.com", source: "Referral Partner", score: 99, date: "May 18, 2026", status: "Closed/Won" }
            ],

            // AI Insights
            aiInsights: [
                { priority: "high-priority", type: "Critical Action", time: "2 hrs ago", title: "Optimize Meta Ad Schedule", desc: `Ad spends on campaigns targeted at ${clientName} core audience are burning ${30 + (seed%15)}% more budget during weekend periods (Fri-Sun) with lower conversions compared to weekdays. We recommend pausing ads during weekends.`, score: "Confidence: 94%" },
                { priority: "medium-priority", type: "Warning Alert", time: "1 day ago", title: "Email Click Rate Decline", desc: "The open-to-click conversion rate on newsletter sequences has declined by 5.4%. Subject lines containing promotional jargon are triggering spam filters. Shift copywriting to value-driven headlines.", score: "Confidence: 81%" },
                { priority: "low-priority", type: "AI Suggestion", time: "2 days ago", title: "Scale Google Search PPC", desc: `Cost Per Lead (CPL) for ${clientName} search campaigns is currently 18% lower than benchmark. Scaling budget by 20% would capture an estimated ${20 + seed} additional qualified leads this week.`, score: "Confidence: 88%" }
            ],

            // Social Reports data (FB, IG, YT - organic & paid)
            social: {
                facebook: {
                    organic: {
                        topPost: {
                            caption: "We are thrilled to partner with industry leaders to drive digital innovation this quarter! 🚀 #business #growth",
                            metrics: "Reach: 42.1K | Likes: 2.4K | Shares: 480",
                            whyHigh: [
                                "Includes high-quality video attachment (which Facebook's algorithm prioritizes in news feeds).",
                                "Shared by 5 prominent industry partners within the first 30 minutes of posting, spiking early virality.",
                                "Contains trending industry hashtags that drove non-follower discoverability."
                            ]
                        },
                        underPost: {
                            caption: "Check out our services page link on our website to see what we can build for your brand today.",
                            metrics: "Reach: 4.8K | Likes: 120 | Shares: 15",
                            whyLow: [
                                "Contains an outbound link in the post body, which Facebook's algorithm penalizes to keep users on-platform.",
                                "Text-only post format with no visual media or video assets attached.",
                                "Low early click-through rate resulted in the algorithm suppressing feed distribution."
                            ]
                        },
                        catalog: [
                            { caption: "We are thrilled to partner with industry leaders to drive digital innovation this quarter! 🚀 #business #growth", reach: "42,100", eng: "2,880", ctr: "5.8%", type: "Video" },
                            { caption: "Check out our services page link on our website to see what we can build for your brand today.", reach: "4,800", eng: "135", ctr: "0.9%", type: "Link" },
                            { caption: "Behind the scenes: Meet our creative design and engineering team hard at work! 🎨💻", reach: "15,200", eng: "940", ctr: "3.2%", type: "Image" }
                        ]
                    },
                    paid: {
                        topPost: {
                            caption: "Get your business operations scaled by 200% with our automated intelligence software. Sign up for a free trial today!",
                            metrics: "Impressions: 110K | Spend: $1.2K | Leads: 342 | ROI: +242%",
                            whyHigh: [
                                "Clear value proposition focused on metrics (200% scaling) immediately grabs user attention.",
                                "Optimized Lead Form integration reduces friction by auto-filling user details directly inside the ad.",
                                "High CTR (4.8%) lowered average Cost Per Lead by 22% compared to historical campaigns."
                            ]
                        },
                        underPost: {
                            caption: "We offer comprehensive services. Contact us to learn more about our company operations and packages.",
                            metrics: "Impressions: 45K | Spend: $850 | Leads: 25 | ROI: -15%",
                            whyLow: [
                                "Vague Call-To-Action ('learn more') fails to create urgency or direct user next-steps.",
                                "Aesthetic was flat with static stock photography that banner-blinded users.",
                                "Targeting was too broad, causing budget waste on unqualified demographics."
                            ]
                        },
                        catalog: [
                            { caption: "Scale operations by 200% with automated intelligence. Free trial today!", reach: "110,000", eng: "5,400", ctr: "4.8%", type: "Lead Ad" },
                            { caption: "Comprehensive business solutions. Contact us for packages.", reach: "45,000", eng: "1,120", ctr: "1.2%", type: "Traffic" },
                            { caption: "Case Study: How we helped a startup secure $15M in series A funding. Read now.", reach: "68,000", eng: "2,800", ctr: "3.1%", type: "Retargeting" }
                        ]
                    }
                },
                instagram: {
                    organic: {
                        topPost: {
                            caption: "How we optimize brand aesthetics for dark-mode interfaces in under 60 seconds. Swipe left! 📱✨ #uidesign #instagramtips",
                            metrics: "Reach: 85.3K | Saves: 4.2K | Likes: 8.9K",
                            whyHigh: [
                                "High-value Carousel format keeps users on the post longer, signaling quality to the Instagram algorithm.",
                                "Explosive growth in 'Saves' (4.2K) which is currently the highest weighted metric for organic distribution.",
                                "Strong visual contrast in slides optimized specifically for mobile screens."
                            ]
                        },
                        underPost: {
                            caption: "Our office building looks beautiful under the afternoon sun today! Have a wonderful week everyone.",
                            metrics: "Reach: 9.2K | Saves: 14 | Likes: 410",
                            whyLow: [
                                "Content has low shareability value and does not solve a customer problem or teach a skill.",
                                "Lacks a hook in the caption or on the cover image to stop users scrolling.",
                                "Posted without hashtags or audio triggers, limiting it strictly to a fraction of existing followers."
                            ]
                        },
                        catalog: [
                            { caption: "How we optimize brand aesthetics in 60s. Swipe left! 📱✨", reach: "85,300", eng: "13,100", ctr: "9.2%", type: "Carousel" },
                            { caption: "Office building under the sun! Have a wonderful week everyone.", reach: "9,200", eng: "424", ctr: "1.1%", type: "Image" },
                            { caption: "A day in the life of a senior product designer. ☕🎨 #designreels", reach: "62,000", eng: "7,800", ctr: "6.5%", type: "Reel" }
                        ]
                    },
                    paid: {
                        topPost: {
                            caption: "Master UX design with our premium templates. Download 50+ vector layout grids now!",
                            metrics: "Impressions: 180K | Spend: $2.4K | Sales: 512 | ROI: +310%",
                            whyHigh: [
                                "Extremely high video watch-through rate (78% watched past 5s) on the reel showcase ad.",
                                "Direct 'Swipe Up' link leads to a highly optimized, single-step mobile checkout page.",
                                "Visual assets clearly previewed what the templates look like in use."
                            ]
                        },
                        underPost: {
                            caption: "Unlock your potential. Join our digital consulting group today for premium tips and guidance.",
                            metrics: "Impressions: 50K | Spend: $900 | Signups: 18 | ROI: -35%",
                            whyLow: [
                                "Offer is too abstract; users do not understand what they are buying or signing up for.",
                                "Slow landing page speed (3.8s mobile load time) caused a 48% checkout drop-off rate.",
                                "Ad creative used text that was too small, violating mobile legibility guidelines."
                            ]
                        },
                        catalog: [
                            { caption: "Master UX design with templates. 50+ grids now!", reach: "180,000", eng: "8,900", ctr: "6.2%", type: "Shopping" },
                            { caption: "Unlock your potential. Digital consulting group today.", reach: "50,000", eng: "850", ctr: "1.1%", type: "Traffic" },
                            { caption: "Are you making these 3 landing page mistakes? Free audit video inside.", reach: "92,000", eng: "4,100", ctr: "3.8%", type: "Video Conversion" }
                        ]
                    }
                },
                youtube: {
                    organic: {
                        topPost: {
                            caption: "Building a Premium Dark-Mode Analytics Dashboard from Scratch (HTML/CSS)",
                            metrics: "Views: 145K | Avg View Duration: 12m 45s | CTR: 8.9%",
                            whyHigh: [
                                "High CTR (8.9%) driven by a professional custom thumbnail with strong text contrast.",
                                "Average View Duration exceeded 60% of video length, prompting algorithm recommendation in 'Up Next' feeds.",
                                "Timely topic solving a developer pain-point, driving organic search queries."
                            ]
                        },
                        underPost: {
                            caption: "Company CEO explains our quarterly operational structure updates and core brand values.",
                            metrics: "Views: 3.2K | Avg View Duration: 1m 20s | CTR: 1.5%",
                            whyLow: [
                                "Low CTR (1.5%) due to standard video thumbnail that lacks a clear visual focal point.",
                                "Heavy drop-off in the first 10 seconds of the video due to slow introduction without a hook.",
                                "Topic is internally focused rather than solving consumer or viewer needs."
                            ]
                        },
                        catalog: [
                            { caption: "Building a Premium Dark-Mode Analytics Dashboard from Scratch (HTML/CSS)", reach: "145,000", eng: "18,400", ctr: "8.9%", type: "Tutorial Video" },
                            { caption: "Company CEO explains operations and brand values.", reach: "3,200", eng: "180", ctr: "1.5%", type: "Corporate Video" },
                            { caption: "Why 90% of dashboard designs look cheap (and how to fix them).", reach: "88,000", eng: "9,200", ctr: "7.1%", type: "Tech Essay" }
                        ]
                    },
                    paid: {
                        topPost: {
                            caption: "Stop manually coding your reports. Automate your client analytics in 5 minutes with our API.",
                            metrics: "Impressions: 420K | Spend: $5K | Conversions: 610 | ROI: +210%",
                            whyHigh: [
                                "Run as an skippable pre-roll ad with a strong hook in the first 5 seconds to prevent skips.",
                                "Targeted strictly at channels related to web development, coding, and business SaaS.",
                                "A clear, prominent on-screen banner link that drove high-intent desktop conversions."
                            ]
                        },
                        underPost: {
                            caption: "Leading software operations consulting agency. Click here to learn about packages.",
                            metrics: "Impressions: 120K | Spend: $3K | Conversions: 42 | ROI: -68%",
                            whyLow: [
                                "Ad was run as a non-skippable 20s format, creating viewer frustration and brand friction.",
                                "The hook did not relate to the targeting, leading to high abandonment rates.",
                                "The Call-to-Action directed users to an unoptimized homepage instead of a campaign-specific landing page."
                            ]
                        },
                        catalog: [
                            { caption: "Stop manually coding reports. Automate analytics with API.", reach: "420,000", eng: "12,100", ctr: "5.5%", type: "Pre-Roll Ad" },
                            { caption: "Leading software operations consulting. Click to learn more.", reach: "120,000", eng: "1,450", ctr: "0.8%", type: "Discovery Ad" },
                            { caption: "Demo: Watch our analytics engine compile 12 reports in real time.", reach: "210,000", eng: "6,900", ctr: "4.1%", type: "Video Action" }
                        ]
                    }
                }
            }
        };
    };

    // Instantiate client database
    const clientDatabase = {};
    for (let i = 0; i < clientNames.length; i++) {
        clientDatabase[`client-${i}`] = generateClientData(i);
    }

    let activeClientId = 'client-0'; // Default client

    // ----------------------------------------------------
    // 4. Dynamic Renderer Helpers
    // ----------------------------------------------------
    const updateDashboardDOM = (client) => {
        // Stats
        document.getElementById('dashValPageviews').textContent = client.stats.pageviews;
        document.getElementById('dashBadgePageviews').textContent = client.stats.pageviewsChange;
        document.getElementById('dashBadgePageviews').className = `stat-badge ${client.stats.pageviewsPositive ? 'positive' : 'negative'}`;

        document.getElementById('dashValUsers').textContent = client.stats.users;
        document.getElementById('dashBadgeUsers').textContent = client.stats.usersChange;
        document.getElementById('dashBadgeUsers').className = `stat-badge ${client.stats.usersPositive ? 'positive' : 'negative'}`;

        document.getElementById('dashValSignups').textContent = client.stats.signups.toLocaleString();
        document.getElementById('dashBadgeSignups').textContent = client.stats.signupsChange;
        document.getElementById('dashBadgeSignups').className = `stat-badge ${client.stats.signupsPositive ? 'positive' : 'negative'}`;

        document.getElementById('dashValSubs').textContent = client.stats.subs;
        document.getElementById('dashBadgeSubs').textContent = client.stats.subsChange;
        document.getElementById('dashBadgeSubs').className = `stat-badge ${client.stats.subsPositive ? 'positive' : 'negative'}`;

        // Chart Header values
        document.getElementById('chartValRevenue').textContent = client.revenueVal;
        document.getElementById('chartBadgeRevenue').textContent = client.revenueChange;
        document.getElementById('chartValProfit').textContent = client.profitVal;
        document.getElementById('chartBadgeProfit').textContent = client.profitChange;
        document.getElementById('chartValSessions').textContent = client.sessionsVal;
        document.getElementById('chartBadgeSessions').textContent = client.sessionsChange;

        // Reports table
        const tbody = document.querySelector('#dashboardReportsTable tbody');
        if (tbody) {
            tbody.innerHTML = '';
            client.overviewCampaigns.forEach(c => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${c.name}</strong></td>
                    <td>${c.source}</td>
                    <td>${c.views.toLocaleString()}</td>
                    <td>${c.conv.toLocaleString()}</td>
                    <td>${c.bounce}</td>
                    <td><span style="color: ${c.roi.startsWith('-') ? 'var(--accent-red)' : 'var(--accent-green)'}; font-weight: 600;">${c.roi}</span></td>
                    <td><span class="status-badge ${c.status}">${c.status}</span></td>
                `;
                tbody.appendChild(tr);
            });
        }
    };

    const updateAnalyticsDOM = (client) => {
        document.getElementById('analValConv').textContent = (4.8 * client.revenueScale).toFixed(2) + "%";
        document.getElementById('analValBounce').textContent = (43.15 + client.revenueScale).toFixed(2) + "%";
        document.getElementById('analValDuration').textContent = Math.round(3 * client.revenueScale) + "m " + Math.round(42 * client.revenueScale % 60) + "s";
        document.getElementById('analValCpl').textContent = "$" + (17.20 / client.revenueScale).toFixed(2);
    };

    const updateCRMTableDOM = (client) => {
        const tbody = document.querySelector('#crmLeadsTable tbody');
        if (tbody) {
            tbody.innerHTML = '';
            client.crmLeads.forEach(lead => {
                const tr = document.createElement('tr');
                const initials = lead.name.split(' ').map(n => n[0]).join('');
                
                let scoreColor = 'var(--accent-green)';
                if (lead.score < 50) scoreColor = 'var(--accent-red)';
                else if (lead.score < 80) scoreColor = '#fbbf24';

                let badgeClass = 'status-badge active';
                if (lead.status === 'Cold' || lead.status === 'Closed/Lost') badgeClass = 'status-badge closed';
                if (lead.status === 'Contacted') badgeClass = 'status-badge paused';
                if (lead.status === 'Closed/Won') badgeClass = 'status-badge completed';

                tr.innerHTML = `
                    <td>
                        <div class="crm-user-card">
                            <div class="crm-user-avatar">${initials}</div>
                            <span class="crm-user-name">${lead.name}</span>
                        </div>
                    </td>
                    <td class="crm-user-email">${lead.email}</td>
                    <td>${lead.source}</td>
                    <td><span style="color: ${scoreColor}; font-weight: 600;">${lead.score} / 100</span></td>
                    <td>${lead.date}</td>
                    <td><span class="${badgeClass}">${lead.status}</span></td>
                `;
                tbody.appendChild(tr);
            });
        }
    };

    const updateInsightsDOM = (client) => {
        const container = document.getElementById('aiInsightsContainer');
        if (container) {
            container.innerHTML = '';
            client.aiInsights.forEach(ins => {
                const div = document.createElement('div');
                div.className = `glass-card insight-card ${ins.priority}`;
                div.innerHTML = `
                    <div class="insight-header">
                        <span class="insight-tag">${ins.type}</span>
                        <span style="color: var(--text-muted); font-size: 0.8rem;">${ins.time}</span>
                    </div>
                    <h3 class="insight-title">${ins.title}</h3>
                    <p class="insight-desc">${ins.desc}</p>
                    <div class="insight-action-row">
                        <button class="btn-solid" style="padding: 0.5rem 1rem; font-size: 0.8rem;">Apply Recommendation</button>
                        <span class="insight-score">${ins.score}</span>
                    </div>
                `;
                container.appendChild(div);
            });
        }
    };

    let activePlatform = 'facebook';
    let activeContentType = 'organic';

    const renderSocialReports = () => {
        const client = clientDatabase[activeClientId];
        const data = client.social[activePlatform][activeContentType];
        
        // Render Top Performer Previews
        const highPreview = document.getElementById('highReachPreview');
        if (highPreview) {
            let platformIconClass = `fa-brands fa-${activePlatform}`;
            let statsPrefix = activeContentType === 'organic' ? 'Organic Stats' : 'Ad Campaign';
            
            highPreview.innerHTML = `
                <div class="preview-thumb">
                    <i class="${platformIconClass}"></i>
                </div>
                <div class="preview-details">
                    <div class="preview-caption">${data.topPost.caption}</div>
                    <div class="preview-metrics">${statsPrefix} - ${data.topPost.metrics}</div>
                </div>
            `;
        }

        // Render Top Performer Drivers
        const highDrivers = document.getElementById('highReachDrivers');
        if (highDrivers) {
            highDrivers.innerHTML = '';
            data.topPost.whyHigh.forEach(item => {
                const li = document.createElement('li');
                li.className = 'reach-point-item success';
                li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${item}</span>`;
                highDrivers.appendChild(li);
            });
        }

        // Render Underperformer Previews
        const lowPreview = document.getElementById('lowReachPreview');
        if (lowPreview) {
            let platformIconClass = `fa-brands fa-${activePlatform}`;
            let statsPrefix = activeContentType === 'organic' ? 'Organic Stats' : 'Ad Campaign';

            lowPreview.innerHTML = `
                <div class="preview-thumb">
                    <i class="${platformIconClass}"></i>
                </div>
                <div class="preview-details">
                    <div class="preview-caption">${data.underPost.caption}</div>
                    <div class="preview-metrics">${statsPrefix} - ${data.underPost.metrics}</div>
                </div>
            `;
        }

        // Render Underperformer Drivers (why low)
        const lowDrivers = document.getElementById('lowReachDrivers');
        if (lowDrivers) {
            lowDrivers.innerHTML = '';
            data.underPost.whyLow.forEach(item => {
                const li = document.createElement('li');
                li.className = 'reach-point-item fail';
                li.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <span>${item}</span>`;
                lowDrivers.appendChild(li);
            });
        }

        // Render Catalog Cards Grid
        const grid = document.getElementById('postsCatalogGrid');
        if (grid) {
            grid.innerHTML = '';
            data.catalog.forEach(post => {
                const card = document.createElement('div');
                card.className = 'post-card';
                
                let iconClass = `fa-brands fa-${activePlatform}`;
                let platformClass = activePlatform;
                
                let metric1Label = activeContentType === 'organic' ? 'Reach' : 'Impr.';
                let metric2Label = activeContentType === 'organic' ? 'Engag.' : 'CTR';
                let metric3Label = activeContentType === 'organic' ? 'CTR' : 'ROI';

                let metric3Val = post.ctr;
                if (activeContentType === 'paid') {
                    // Paid catalog has conversions/ROI
                    metric3Val = activePlatform === 'facebook' ? '+242%' : (activePlatform === 'instagram' ? '+310%' : '+210%');
                }

                card.innerHTML = `
                    <div class="post-image-header">
                        <div class="post-platform-icon ${platformClass}"><i class="${iconClass}"></i></div>
                        <div class="post-type-badge">${post.type}</div>
                        <div style="font-size: 2rem; color: #4b526d;"><i class="fa-regular fa-image"></i></div>
                    </div>
                    <div class="post-body-content">
                        <p class="post-caption-text">${post.caption}</p>
                        <div class="post-stats-row">
                            <div>
                                <span class="post-stat-label">${metric1Label}</span>
                                <span class="post-stat-val">${post.reach}</span>
                            </div>
                            <div>
                                <span class="post-stat-label">${metric2Label}</span>
                                <span class="post-stat-val">${post.eng}</span>
                            </div>
                            <div>
                                <span class="post-stat-label">${metric3Label}</span>
                                <span class="post-stat-val" style="color: ${metric3Label === 'ROI' ? 'var(--accent-green)' : 'var(--text-main)'}; font-weight: 700;">${metric3Val}</span>
                            </div>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }
    };

    // ----------------------------------------------------
    // 5. Client Dropdown Switch Action
    // ----------------------------------------------------
    const clientSelector = document.getElementById('clientSelector');
    if (clientSelector) {
        clientSelector.addEventListener('change', (e) => {
            activeClientId = e.target.value;
            const client = clientDatabase[activeClientId];
            
            window.showToast('Client Account Switched', `Loaded workspace data for ${client.name}.`, 'success');

            // Refresh DOM Elements on active screen
            updateDashboardDOM(client);
            updateAnalyticsDOM(client);
            updateCRMTableDOM(client);
            updateInsightsDOM(client);
            renderSocialReports();

            // Redraw charts
            const currentHash = window.location.hash || '#dashboard';
            initChartsForView(currentHash);
        });
    }

    // ----------------------------------------------------
    // 6. SPA Routing & Switch Views
    // ----------------------------------------------------
    const isDashboardPage = window.location.pathname.includes('dashboard.html');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link, .nav-sub-link');
    const tabViews = document.querySelectorAll('.tab-view');
    let charts = {};

    const switchView = (targetHash) => {
        if (!targetHash) targetHash = '#dashboard';
        
        let foundView = false;
        tabViews.forEach(view => {
            const viewId = '#' + view.id;
            if (viewId === targetHash) {
                view.classList.add('active-view');
                foundView = true;
            } else {
                view.classList.remove('active-view');
            }
        });

        if (!foundView) {
            const defaultView = document.getElementById('dashboard');
            if (defaultView) defaultView.classList.add('active-view');
            targetHash = '#dashboard';
        }

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === targetHash) {
                link.classList.add('active');
                
                const parentItem = link.closest('.nav-item');
                if (parentItem && link.classList.contains('nav-sub-link')) {
                    parentItem.classList.add('open');
                }
            } else {
                // If switching away, don't remove active class from parent dropdown header
                if (!link.classList.contains('nav-link-dropdown')) {
                    link.classList.remove('active');
                }
            }
        });

        // Set navbar active states for parent menu header
        const dashboardDropdown = document.querySelector('.nav-link-dropdown');
        if (dashboardDropdown) {
            if (['#dashboard', '#analytics', '#leads'].includes(targetHash)) {
                dashboardDropdown.classList.add('active');
            } else {
                dashboardDropdown.classList.remove('active');
            }
        }

        updateHeaderInfo(targetHash);

        // Load data on switch
        const client = clientDatabase[activeClientId];
        updateDashboardDOM(client);
        updateAnalyticsDOM(client);
        updateCRMTableDOM(client);
        updateInsightsDOM(client);
        renderSocialReports();

        setTimeout(() => {
            initChartsForView(targetHash);
        }, 100);
    };

    const updateHeaderInfo = (hash) => {
        const titleEl = document.getElementById('mainPageTitle');
        const descEl = document.getElementById('mainPageDesc');
        if (!titleEl) return;

        const client = clientDatabase[activeClientId];

        switch (hash) {
            case '#dashboard':
                titleEl.textContent = `Welcome back, ${client.name.split(' ')[0]}`;
                descEl.textContent = 'Measure your advertising ROI and report website traffic.';
                break;
            case '#analytics':
                titleEl.textContent = 'Performance Analytics';
                descEl.textContent = `Deep dive acquisition channels for ${client.name}.`;
                break;
            case '#leads':
                titleEl.textContent = 'Lead CRM';
                descEl.textContent = `Manage and contact incoming leads for ${client.name}.`;
                break;
            case '#social-reports':
                titleEl.textContent = 'Social media Performance';
                descEl.textContent = `Organic post details, ad campaigns, and algorithms diagnostic reports for ${client.name}.`;
                break;
            case '#insights':
                titleEl.textContent = 'AI Insights';
                descEl.textContent = `Automated recommendations powered by VilPower Nexus algorithms for ${client.name}.`;
                break;
            case '#settings':
                titleEl.textContent = 'System Settings';
                descEl.textContent = 'Configure workspace details, profile notifications, and API integrations.';
                break;
        }
    };

    if (isDashboardPage) {
        window.addEventListener('hashchange', () => {
            switchView(window.location.hash);
            if (sidebar) sidebar.classList.remove('mobile-active');
        });

        // Toggle sub menu
        const collapsibleHeaders = document.querySelectorAll('.sidebar-nav .nav-link-dropdown');
        collapsibleHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = header.closest('.nav-item');
                if (parent) {
                    parent.classList.toggle('open');
                }
            });
        });

        // Initialize view based on current hash
        const initialHash = window.location.hash || '#dashboard';
        switchView(initialHash);
    }

    // Mobile menu toggles
    window.toggleSidebar = () => {
        if (sidebar) sidebar.classList.toggle('mobile-active');
    };

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('mobile-active');
        }
    });

    // ----------------------------------------------------
    // 7. Social Reports Tabs (FB / IG / YT) & Toggles Click Events
    // ----------------------------------------------------
    const platformBtns = document.querySelectorAll('.social-tab-btn');
    platformBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            platformBtns.forEach(b => b.classList.remove('active'));
            const targetBtn = e.target.closest('.social-tab-btn');
            targetBtn.classList.add('active');
            activePlatform = targetBtn.getAttribute('data-platform');
            renderSocialReports();
        });
    });

    const typeBtns = document.querySelectorAll('.social-toggle-btn');
    typeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            typeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeContentType = e.target.getAttribute('data-type');
            renderSocialReports();
        });
    });

    // ----------------------------------------------------
    // 8. Chart.js Initializers
    // ----------------------------------------------------
    const initChartsForView = (viewHash) => {
        const client = clientDatabase[activeClientId];

        const destroyChart = (id) => {
            if (charts[id]) {
                charts[id].destroy();
                delete charts[id];
            }
        };

        if (viewHash === '#dashboard') {
            destroyChart('revenueChart');
            destroyChart('profitChart');
            destroyChart('sessionsChart');

            const revCtx = document.getElementById('revenueChartCanvas');
            if (revCtx) {
                const ctx2d = revCtx.getContext('2d');
                const gradPurple = ctx2d.createLinearGradient(0, 0, 0, 300);
                gradPurple.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
                gradPurple.addColorStop(1, 'rgba(99, 102, 241, 0.00)');

                const gradCyan = ctx2d.createLinearGradient(0, 0, 0, 300);
                gradCyan.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
                gradCyan.addColorStop(1, 'rgba(6, 182, 212, 0.00)');

                charts.revenueChart = new Chart(revCtx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Revenue',
                                data: client.chartRevenue,
                                borderColor: '#6366f1',
                                borderWidth: 3,
                                backgroundColor: gradPurple,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#6366f1',
                                pointHoverRadius: 7,
                                pointHoverBackgroundColor: '#ffffff',
                                pointHoverBorderColor: '#6366f1',
                                pointHoverBorderWidth: 3
                            },
                            {
                                label: 'Expenses',
                                data: client.chartExpenses,
                                borderColor: '#06b6d4',
                                borderWidth: 3,
                                backgroundColor: gradCyan,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#06b6d4',
                                pointHoverRadius: 7,
                                pointHoverBackgroundColor: '#ffffff',
                                pointHoverBorderColor: '#06b6d4',
                                pointHoverBorderWidth: 3
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#141724',
                                titleColor: '#828a9b',
                                bodyColor: '#ffffff',
                                borderColor: '#1e2235',
                                borderWidth: 1,
                                padding: 12,
                                displayColors: true,
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) label += ': ';
                                        if (context.parsed.y !== null) {
                                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y * 1000);
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                grid: { color: '#1e2235', drawBorder: false },
                                ticks: {
                                    color: '#828a9b',
                                    font: { family: 'Inter', size: 11 },
                                    callback: function(value) { return value + 'K'; }
                                }
                            },
                            x: {
                                grid: { display: false },
                                ticks: { color: '#828a9b', font: { family: 'Inter', size: 11 } }
                            }
                        }
                    }
                });
            }

            const profitCtx = document.getElementById('profitChartCanvas');
            if (profitCtx) {
                const ctx2d = profitCtx.getContext('2d');
                const barGradient = ctx2d.createLinearGradient(0, 0, 0, 120);
                barGradient.addColorStop(0, '#6366f1');
                barGradient.addColorStop(1, '#06b6d4');

                charts.profitChart = new Chart(profitCtx, {
                    type: 'bar',
                    data: {
                        labels: ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'],
                        datasets: [{
                            data: client.chartProfit,
                            backgroundColor: barGradient,
                            borderRadius: 4,
                            barThickness: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#141724',
                                borderColor: '#1e2235',
                                borderWidth: 1,
                                padding: 8,
                                callbacks: {
                                    label: function(context) { return '$' + context.parsed.y.toFixed(1) + 'K'; }
                                }
                            }
                        },
                        scales: {
                            y: { display: false },
                            x: {
                                grid: { display: false },
                                ticks: { color: '#828a9b', font: { family: 'Inter', size: 10 }, maxTicksLimit: 4 }
                            }
                        }
                    }
                });
            }

            const sessCtx = document.getElementById('sessionsChartCanvas');
            if (sessCtx) {
                const ctx2d = sessCtx.getContext('2d');
                const sparkGradient = ctx2d.createLinearGradient(0, 0, 0, 100);
                sparkGradient.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
                sparkGradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

                charts.sessionsChart = new Chart(sessCtx, {
                    type: 'line',
                    data: {
                        labels: ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'],
                        datasets: [{
                            data: client.chartSessions,
                            borderColor: '#06b6d4',
                            borderWidth: 2,
                            backgroundColor: sparkGradient,
                            fill: true,
                            tension: 0.45,
                            pointRadius: 0,
                            pointHoverRadius: 5
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#141724',
                                borderColor: '#1e2235',
                                borderWidth: 1,
                                padding: 8
                            }
                        },
                        scales: {
                            y: { display: false },
                            x: {
                                grid: { display: false },
                                ticks: { color: '#828a9b', font: { family: 'Inter', size: 10 }, maxTicksLimit: 4 }
                            }
                        }
                    }
                });
            }
        } 
        
        else if (viewHash === '#analytics') {
            destroyChart('deviceChart');
            destroyChart('conversionChart');

            const devCtx = document.getElementById('deviceChartCanvas');
            if (devCtx) {
                charts.deviceChart = new Chart(devCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV'],
                        datasets: [{
                            data: client.chartDevice,
                            backgroundColor: ['#6366f1', '#06b6d4', '#ec4899', '#f59e0b'],
                            borderWidth: 3,
                            borderColor: '#121420'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    color: '#828a9b',
                                    font: { family: 'Inter', size: 11, weight: '500' },
                                    padding: 15
                                }
                            }
                        },
                        cutout: '70%'
                    }
                });
            }

            const convCtx = document.getElementById('conversionChartCanvas');
            if (convCtx) {
                charts.conversionChart = new Chart(convCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Impressions', 'Clicks', 'Signups', 'First Payment', 'Subscribed'],
                        datasets: [{
                            label: 'Conversion Count',
                            data: client.chartFunnel,
                            backgroundColor: ['#1e1b4b', '#312e81', '#3730a3', '#4338ca', '#6366f1'],
                            borderRadius: 6
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: { grid: { color: '#1e2235' }, ticks: { color: '#828a9b' } },
                            y: { grid: { display: false }, ticks: { color: '#828a9b' } }
                        }
                    }
                });
            }
        }
    };

    // ----------------------------------------------------
    // 9. CRM Search and Filtering
    // ----------------------------------------------------
    const crmSearch = document.getElementById('crmSearchInput');
    if (crmSearch) {
        crmSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const crmTableRows = document.querySelectorAll('#crmLeadsTable tbody tr');
            
            crmTableRows.forEach(row => {
                const name = row.querySelector('.crm-user-name').textContent.toLowerCase();
                const email = row.querySelector('.crm-user-email').textContent.toLowerCase();
                const source = row.children[2].textContent.toLowerCase();
                const status = row.querySelector('.status-badge').textContent.toLowerCase();

                if (name.includes(query) || email.includes(query) || source.includes(query) || status.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    const addLeadBtn = document.getElementById('addLeadBtn');
    if (addLeadBtn) {
        addLeadBtn.addEventListener('click', () => {
            window.showToast('Lead Form Opened', 'Lead creation modal would open here in production.', 'info');
        });
    }

    // ----------------------------------------------------
    // 10. Settings Form Submissions
    // ----------------------------------------------------
    const profileForm = document.getElementById('profileSettingsForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const saveBtn = profileForm.querySelector('button[type="submit"]');
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            setTimeout(() => {
                saveBtn.disabled = false;
                saveBtn.innerHTML = 'Save Changes';
                
                const nameInput = document.getElementById('settingsName');
                if (nameInput) {
                    const newName = nameInput.value.trim();
                    if (newName) {
                        const sidebarNameEl = document.querySelector('.user-name');
                        const welcomeHeaderEl = document.getElementById('mainPageTitle');
                        if (sidebarNameEl) sidebarNameEl.textContent = newName;
                        if (welcomeHeaderEl && window.location.hash === '#dashboard') {
                            welcomeHeaderEl.textContent = `Welcome back, ${newName.split(' ')[0]}`;
                        }
                    }
                }
                window.showToast('Settings Saved', 'Profile configuration updated successfully.', 'success');
            }, 600);
        });
    }

    // Quick export and report buttons alerts
    const exportBtns = document.querySelectorAll('.export-btn-el');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.showToast('Export Started', 'Data export is being prepared and will download shortly.', 'success');
        });
    });

    const createReportBtns = document.querySelectorAll('.create-report-btn-el');
    createReportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.showToast('Report Wizard', 'Initiating standard intelligence report generator...', 'info');
        });
    });
});
