export function Services() {
  return (
    <section id="services" className="pt-16 lg:pt-24 pb-4 lg:pb-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[520px_520px] gap-3 lg:gap-4">
          {/* Automate Your Business Tasks */}
          <div className="lg:col-span-8 group" style={{ opacity: 1, transform: "none" }}>
            <div className="border border-border-light relative h-full rounded-[12px] overflow-hidden min-h-[300px] sm:min-h-[360px] lg:min-h-0 transition-transform duration-300 ease-out flex flex-col sm:block">
              <div className="relative z-10 flex flex-col gap-4 p-6 lg:p-8 sm:max-w-[55%] md:max-w-[48%] lg:max-w-[50%] sm:h-full overflow-visible">
                <div className="self-start">
                  <div className="relative">
                    <div
                      className="inline-flex px-3 py-1 sm:px-4 sm:py-1.5 rounded-[12px] sm:rounded-[16px] rounded-bl-[4px] sm:rounded-bl-[6px] whitespace-nowrap"
                      style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    >
                      <span
                        className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium"
                        style={{ color: "#3b82f6" }}
                      >
                        &ldquo;I want to save time writing emails&rdquo;
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary leading-[1.1] tracking-tight">
                  Automate Your
                  <br />
                  Business Tasks
                </h3>
                <div className="flex-1 hidden sm:block" />
                <a
                  className="self-start inline-flex items-center justify-center px-5 py-2.5 sm:px-7 sm:py-3.5 text-[13px] sm:text-[15px] font-semibold rounded-full text-text-primary bg-white border border-border-subtle hover:bg-black/5 transition-colors duration-200"
                  href="/demo"
                >
                  Book a demo
                </a>
              </div>
              <div className="relative sm:absolute sm:right-4 md:right-6 lg:right-8 sm:bottom-0 w-full sm:w-[58%] md:w-[55%] lg:w-[50%] sm:max-w-[380px] sm:origin-bottom-right sm:scale-[0.72] md:scale-[0.78] lg:scale-[0.85] xl:scale-100 px-4 sm:px-0 mt-4 sm:mt-0">
                <div className="rounded-t-[16px] overflow-hidden shadow-2xl bg-black/70 px-5 pt-5">
                  <div className="rounded-t-[16px] overflow-hidden shadow-2xl bg-white/15 px-5 pt-5">
                    <div className="pb-3">
                      <p className="text-[13px] font-medium text-[#FAFAFA]">Email Assistant</p>
                    </div>
                    <div className="pb-3">
                      <p className="text-[13px] font-semibold text-white/80 mb-2.5">Draft Ready</p>
                      <div
                        className="rounded-[16px] px-4 py-3.5 space-y-2 border border-white/15"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[13px] font-semibold text-[#FAFAFA]">
                            Re: Appointment confirmation
                          </p>
                        </div>
                        <p className="text-[11px] text-[#FAFAFA] leading-relaxed">
                          Hi Sarah, confirming your appointment for Thursday at 2pm. Reply to
                          reschedule...
                        </p>
                      </div>
                    </div>
                    <div className="pb-5">
                      <p className="text-[13px] font-medium text-[#FAFAFA] mb-2.5">Queued</p>
                      <div
                        className="rounded-[16px] px-4 py-3.5 space-y-2 border border-white/15"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[13px] font-semibold text-[#FAFAFA]">
                              Follow-up: Invoice #1042
                            </p>
                            <p className="text-[11px] text-[#FAFAFA] mt-0.5">Scheduled for 9:00 AM</p>
                          </div>
                          <span className="text-[11px] font-medium text-white/80">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Streamline Your Communications */}
          <div className="lg:col-span-4" style={{ opacity: 1, transform: "none" }}>
            <div
              className="relative h-full rounded-[12px] overflow-hidden isolate min-h-[380px] lg:min-h-0 flex flex-col transition-transform duration-300 ease-out"
              style={{
                background:
                  "linear-gradient(160deg, rgb(192, 132, 252) 0%, rgb(232, 121, 168) 20%, rgb(249, 115, 22) 40%, rgb(232, 121, 168) 55%, rgb(167, 139, 250) 70%, rgb(59, 130, 246) 100%)",
              }}
            >
              <div className="relative z-10 p-6 lg:p-8">
                <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-[1.1] tracking-tight">
                  Streamline Your
                  <br />
                  Communications
                </h3>
              </div>
              <div className="relative z-10 mx-6 lg:mx-8 mb-6 lg:mb-8 flex-1 flex flex-col justify-end">
                <div className="bg-black/70 rounded-[16px] overflow-hidden px-4 py-4 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-white/15 mt-0.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v4" />
                        <line x1="8" y1="16" x2="8" y2="16" />
                        <line x1="16" y1="16" x2="16" y2="16" />
                      </svg>
                    </div>
                    <div
                      className="rounded-[16px] border border-white/15 px-3.5 py-2.5 max-w-[85%]"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[11px] font-semibold text-[#FAFAFA] mb-1">AI Assistant</p>
                      <span className="text-[12px] lg:text-[13px] text-white/80 leading-relaxed block">
                        I&rsquo;ve confirmed tomorrow&rsquo;s appointments and sent reminders to each
                        client.
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="rounded-[16px] border border-white/15 px-3.5 py-2.5 max-w-[85%]"
                      style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                    >
                      <p className="text-[12px] lg:text-[13px] text-white/80 leading-relaxed">
                        Perfect, can you flag anyone who hasn&rsquo;t replied yet?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-white/15 mt-0.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v4" />
                        <line x1="8" y1="16" x2="8" y2="16" />
                        <line x1="16" y1="16" x2="16" y2="16" />
                      </svg>
                    </div>
                    <div
                      className="rounded-[16px] border border-white/15 px-3.5 py-2.5 max-w-[85%]"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[11px] font-semibold text-[#FAFAFA] mb-1">AI Assistant</p>
                      <span className="text-[12px] lg:text-[13px] text-white/80 leading-relaxed block">
                        Yes, I highlighted the pending replies and queued follow-ups.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Your Finances */}
          <div className="lg:col-span-4 group" style={{ opacity: 1, transform: "none" }}>
            <div className="h-full min-h-[440px] lg:min-h-0 rounded-[12px] p-6 lg:p-8 flex flex-col gap-5 bg-secondary transition-transform duration-300 ease-out">
              <div className="relative">
                <div
                  className="inline-flex px-3 py-1 sm:px-4 sm:py-1.5 rounded-[12px] sm:rounded-[16px] rounded-bl-[4px] sm:rounded-bl-[6px] whitespace-nowrap"
                  style={{ backgroundColor: "#3b82f6" }}
                >
                  <span
                    className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium"
                    style={{ color: "#ffffff" }}
                  >
                    &ldquo;I want to automate my invoicing&rdquo;
                  </span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary leading-[1.1] tracking-tight">
                Manage Your Finances
              </h3>
              <div className="flex-1 bg-black/70 rounded-[16px] overflow-hidden flex flex-col">
                <div className="p-4 flex flex-col flex-1 gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-[#FAFAFA]">Monthly Overview</p>
                    <span className="text-[10px] font-medium border border-accent-green text-accent-green px-2 py-0.5 rounded-full">
                      +12.4%
                    </span>
                  </div>
                  <div>
                    <p className="text-[22px] font-bold text-[#FAFAFA] tracking-tight">$24,580</p>
                    <p className="text-[10px] text-white/80 mt-0.5">Total revenue this month</p>
                  </div>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
            .bento-bar-dim { background-color: rgba(96,165,250,0.35); }
            .bento-bar-bright { background-color: rgba(96,165,250,0.8); }
            .bento-bar-lg-only { background-color: rgba(96,165,250,0.35); }
            .bento-bar-xl-only { background-color: rgba(96,165,250,0.35); }
            @media (min-width: 1024px) {
              .bento-bar-lg-only { background-color: rgba(96,165,250,0.8); }
            }
            @media (min-width: 1280px) {
              .bento-bar-lg-only { background-color: rgba(96,165,250,0.35); }
              .bento-bar-xl-only { background-color: rgba(96,165,250,0.8); }
            }
          `,
                    }}
                  />
                  <div className="flex items-end gap-1 sm:gap-1.5 flex-1 pt-2">
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "18%" }} />
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "38%" }} />
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "24%" }} />
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "52%" }} />
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "35%" }} />
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "60%" }} />
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "45%" }} />
                    <div className="flex-1 rounded-full bento-bar-dim" style={{ height: "68%" }} />
                    <div className="flex-1 rounded-full bento-bar-lg-only" style={{ height: "72%" }} />
                    <div className="flex-1 rounded-full bento-bar-lg-only" style={{ height: "85%" }} />
                    <div
                      className="flex-1 rounded-full lg:hidden xl:block bento-bar-dim"
                      style={{ height: "62%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden xl:block bento-bar-dim"
                      style={{ height: "82%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden xl:block bento-bar-dim"
                      style={{ height: "68%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden xl:block bento-bar-dim"
                      style={{ height: "78%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden xl:block bento-bar-xl-only"
                      style={{ height: "88%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden xl:block bento-bar-xl-only"
                      style={{ height: "95%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "70%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "55%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "80%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "62%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "85%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "72%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "78%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-dim"
                      style={{ height: "88%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-bright"
                      style={{ height: "82%" }}
                    />
                    <div
                      className="flex-1 rounded-full lg:hidden bento-bar-bright"
                      style={{ height: "96%" }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="text-center">
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">142</p>
                      <p className="text-[9px] text-white/80">Invoices</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">$3,200</p>
                      <p className="text-[9px] text-white/80">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">$21,380</p>
                      <p className="text-[9px] text-white/80">Paid</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Your Campaigns */}
          <div className="lg:col-span-4 group" style={{ opacity: 1, transform: "none" }}>
            <div
              className="relative h-full rounded-[12px] overflow-hidden isolate flex flex-col min-h-[340px] lg:min-h-0 transition-transform duration-300 ease-out"
              style={{
                background:
                  "linear-gradient(160deg, #a78bfa 0%, #818cf8 25%, #f87171 50%, #fb923c 70%, #fbbf24 100%)",
              }}
            >
              <div className="relative lg:absolute lg:top-0 lg:left-0 z-20 p-6 lg:p-8 pb-0">
                <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-[1.1] tracking-tight">
                  Generate Your
                  <br />
                  Campaigns
                </h3>
              </div>
              <div className="relative z-10 lg:flex-1 lg:flex lg:items-center mx-6 lg:mx-8 mt-4 lg:mt-0 mb-6 lg:mb-0">
                <div className="w-full bg-black/70 rounded-[16px] overflow-hidden p-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className="rounded-[12px] px-3.5 py-3 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">Summer Sale</p>
                      <p className="text-[10px] text-white/80 mt-0.5">Email + SMS</p>
                      <p className="text-[11px] font-semibold mt-2 text-accent-green">2.4k sent</p>
                    </div>
                    <div
                      className="rounded-[12px] px-3.5 py-3 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">New Menu Drop</p>
                      <p className="text-[10px] text-white/80 mt-0.5">Instagram + Email</p>
                      <p className="text-[11px] font-semibold mt-2 text-accent-blue">1.8k reached</p>
                    </div>
                    <div
                      className="rounded-[12px] px-3.5 py-3 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">Flash Promo</p>
                      <p className="text-[10px] text-white/80 mt-0.5">Push + SMS</p>
                      <p className="text-[11px] font-semibold mt-2 text-accent-yellow">3.1k sent</p>
                    </div>
                    <div
                      className="rounded-[12px] px-3.5 py-3 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">Loyalty Reward</p>
                      <p className="text-[10px] text-white/80 mt-0.5">Email + In-App</p>
                      <p className="text-[11px] font-semibold mt-2 text-accent-green">1.2k opened</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reach Local Customers */}
          <div className="lg:col-span-4 group" style={{ opacity: 1, transform: "none" }}>
            <div className="h-full min-h-[380px] lg:min-h-0 rounded-[12px] p-6 lg:p-8 flex flex-col gap-5 border border-border-light transition-transform duration-300 ease-out">
              <div className="relative">
                <div
                  className="inline-flex px-3 py-1 sm:px-4 sm:py-1.5 rounded-[12px] sm:rounded-[16px] rounded-bl-[4px] sm:rounded-bl-[6px] whitespace-nowrap"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <span
                    className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium"
                    style={{ color: "#3b82f6" }}
                  >
                    &ldquo;I want to find new leads nearby&rdquo;
                  </span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary leading-[1.1] tracking-tight">
                Reach Local <br /> Customers
              </h3>
              <div className="flex-1 bg-black/70 rounded-[16px] overflow-hidden">
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-[#FAFAFA]">Lead Pipeline</p>
                    <span className="text-[10px] font-medium text-accent-blue">12 new today</span>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-[#FAFAFA]"
                          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                        >
                          SM
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#FAFAFA]">Sarah M.</p>
                          <p className="text-[9px] text-white/80">2m ago</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-semibold border px-2 py-1 rounded-full text-accent-blue border-accent-blue">
                        Contacted
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-[#FAFAFA]"
                          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                        >
                          JR
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#FAFAFA]">James R.</p>
                          <p className="text-[9px] text-white/80">15m ago</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-semibold border px-2 py-1 rounded-full text-accent-green border-accent-green">
                        Qualified
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-[#FAFAFA]"
                          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                        >
                          LK
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#FAFAFA]">Lisa K.</p>
                          <p className="text-[9px] text-white/80">1h ago</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-semibold border px-2 py-1 rounded-full text-accent-yellow border-accent-yellow">
                        New Lead
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[10px] text-white/80">Conversion rate</p>
                    <p className="text-[13px] font-bold text-accent-green">34.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
