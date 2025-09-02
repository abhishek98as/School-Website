
import { getContent } from '@/lib/content-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AboutUsPage() {
    const content = await getContent();
    const pageContent = content.about.aboutUs;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">{pageContent.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                {pageContent.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </CardContent>
        </Card>
    );
}
