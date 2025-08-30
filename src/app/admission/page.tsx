import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, FileText } from "lucide-react";

const ageCriteria = [
  { class: "Nursery", age: "03 years" },
  { class: "KG-I", age: "04 years" },
  { class: "KG-II", age: "05 years" },
  { class: "I", age: "06 years" },
  { class: "II", age: "07 years" },
  { class: "III", age: "08 years" },
  { class: "IV", age: "09 years" },
  { class: "V", age: "10 years" },
  { class: "VI", age: "11 years" },
  { class: "VII", age: "12 years" },
  { class: "VIII", age: "13 years" },
  { class: "IX", age: "14 years" },
];

const feeStructure = [
    { class: "Nursery", fee: "₹ 30,000" },
    { class: "KG-I", fee: "₹ 32,000" },
    { class: "KG-II", fee: "₹ 32,000" },
    { class: "I", fee: "₹ 35,000" },
    { class: "II", fee: "₹ 35,000" },
    { class: "III", fee: "₹ 38,000" },
    { class: "IV", fee: "₹ 38,000" },
    { class: "V", fee: "₹ 40,000" },
    { class: "VI", fee: "₹ 42,000" },
    { class: "VII", fee: "₹ 42,000" },
    { class: "VIII", fee: "₹ 45,000" },
    { class: "IX", fee: "₹ 50,000" },
];

const documentsRequired = [
  "Evidence of date of birth (Birth Certificate for PG/KG, T.C. from previous school for Class I+).",
  "Original and photocopy of the previous school's mark sheet.",
  "School leaving certificate for students joining from Class VII upwards, countersigned by educational authorities.",
  "A student will be admitted only to the class mentioned on the transfer certificate.",
];

export default function AdmissionPage() {
  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Admissions <span className="text-primary">2025-26</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community of learners. Find all the information you need to start your journey with us.
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
                      {ageCriteria.map((item) => (
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
                      {feeStructure.map((item) => (
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
                  {documentsRequired.map((doc, index) => (
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
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfwLVi5E2tO-Vp1J_iJg_3J-3z_Rz-tX6yQ9z3zX3zX3zX3zX/viewform?embedded=true" 
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
