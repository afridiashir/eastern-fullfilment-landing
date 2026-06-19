export function VideoSection() {
  return (
    <section className="container-px">

      <div className="group relative mx-auto mt-12  overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-secondary to-purple-400/10 shadow-xl shadow-primary/5">
        <video
          className="h-full w-full object-cover lg:hidden"
          src="/cloud.mobile-BiHR-WV1.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <video
          className="hidden h-full w-full object-cover lg:block"
          src="/cloud-BOyPb80F.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute bottom-5 left-6 rounded-full bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur">
          2:14 — Product walkthrough
        </div>
      </div>
    </section>
  );
}
