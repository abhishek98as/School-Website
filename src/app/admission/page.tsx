import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getContent } from "@/lib/content-loader";
import { CheckCircle, FileText } from "lucide-react";
import { ParticleCanvas } from "@/components/particle-canvas";

// Utility function to convert Google Forms URL to embeddable format
function getEmbeddableFormUrl(url: string): string {
  try {
    // Handle different Google Forms URL formats
    if (url.includes('docs.google.com/forms')) {
      // Extract the form ID from the URL
      const formIdMatch = url.match(/\/forms\/d\/e\/([^\/]+)/);
      if (formIdMatch) {
        const formId = formIdMatch[1];
        return `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
      }
      
      // If it's already an embedded URL, return as is
      if (url.includes('embedded=true')) {
        return url;
      }
      
      // If it's a viewform URL, convert to embedded
      if (url.includes('viewform')) {
        const baseUrl = url.split('?')[0];
        return `${baseUrl}?embedded=true`;
      }
    }
    
    // Handle shortened URLs (forms.gle)
    if (url.includes('forms.gle/')) {
      // For shortened URLs, we'll use them as-is for the iframe
      // Google will handle the redirect and embedding
      return url;
    }
    
    // Handle other shortened URLs (goo.gl, etc.)
    if (url.includes('goo.gl/') || url.includes('bit.ly/') || url.includes('tinyurl.com/')) {
      // For these, we'll use them as-is and let the iframe handle it
      return url;
    }
    
    // Default: return the URL as-is
    return url;
  } catch (error) {
    console.error('Error processing form URL:', error);
    return url;
  }
}


export default async function AdmissionPage() {
  const content = await getContent();
  const admissionContent = content.admission;

  // Process the Google Form URL to make it embeddable
  const embeddableFormUrl = getEmbeddableFormUrl(admissionContent.enquiryFormUrl);

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10 overflow-hidden">
        <ParticleCanvas />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {admissionContent.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {admissionContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Age Criteria</CardTitle>
                  <CardDescription>Minimum age for admission as on 31st March.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead className="text-right">Age</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admissionContent.ageCriteria.map((item) => (
                        <TableRow key={item.class}>
                          <TableCell className="font-medium">{item.class}</TableCell>
                          <TableCell className="text-right">{item.age}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

               <Card>
                <CardHeader>
                  <CardTitle>Fee Structure</CardTitle>
                  <CardDescription>Annual school fees per class standard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead className="text-right">Annual Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admissionContent.feeStructure.map((item) => (
                        <TableRow key={item.class}>
                          <TableCell className="font-medium">{item.class}</TableCell>
                          <TableCell className="text-right">{item.fee}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Documents Required</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {admissionContent.documentsRequired.map((doc, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{doc}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admission Enquiry</CardTitle>
                  <CardDescription>Fill out the form below to make an admission enquiry.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="aspect-w-16 aspect-h-9 min-h-[500px]">
                     <iframe 
                        src={embeddableFormUrl}
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        marginHeight={0} 
                        marginWidth={0}
                        className="w-full h-full"
                        title="Admission Enquiry Form"
                        >
                        Loading…
                    </iframe>
                  </div>
                  <div className="mt-4 text-center">
                    <a
                      href={admissionContent.enquiryFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      Open form in new tab →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
