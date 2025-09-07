import { getContent } from "@/lib/content-loader";
import { ParticleCanvas } from "@/components/particle-canvas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PrivacyPolicyPage() {
  const content = await getContent();
  const privacyContent = content.privacyPolicy;

  // If privacyPolicy content is not available, show error page
  if (!privacyContent) {
    return (
      <div className="bg-background">
        <section className="relative py-20 md:py-32 bg-primary/10 overflow-hidden">
          <ParticleCanvas />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Content is being loaded. Please refresh the page.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10 overflow-hidden">
        <ParticleCanvas />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {privacyContent.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {privacyContent.subtitle}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last Updated: {privacyContent.lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {privacyContent.sections.map((section, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  {section.content.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
