import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getContent } from "@/lib/content-loader";
import { CheckCircle, FileText } from "lucide-react";


export default async function AdmissionPage() {
  const content = await getContent();
  const admissionContent = content.admission;

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
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
                        src={admissionContent.enquiryFormUrl}
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        marginHeight={0} 
                        marginWidth={0}
                        className="w-full h-full"
                        >
                        Loading…
                    </iframe>
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
