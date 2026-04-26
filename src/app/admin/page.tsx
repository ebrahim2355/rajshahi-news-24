import Link from "next/link";
import { AdminArticleForm } from "@/components/admin-article-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";

export const metadata = {
  title: "অ্যাডমিন — নতুন খবর",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-section-gray/50 py-8">
        <Container className="max-w-2xl">
          <p className="mb-4 text-sm text-muted">
            <Link href="/" className="text-brand hover:underline">
              ← প্রচ্ছদ
            </Link>
          </p>
          <h1 className="text-2xl font-extrabold">নতুন খবর তৈরি</h1>
          <p className="mt-1 text-sm text-muted">
            ডাটাবেসে সেভ হবে। পাবলিক লিস্ট/হোম ফিড পরে যুক্ত করা যাবে।
          </p>
          <div className="mt-6">
            <AdminArticleForm />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
