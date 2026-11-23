import { Suspense, useState } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloatingCallWidget } from './components/FloatingCallWidget';
import { FloatingQuickAccess } from './components/FloatingQuickAccess';
import { LazySection, lazyWithRetry } from './components/LazySection';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { LanguageProvider } from './contexts/LanguageContext';

const BoardHonorsSection = lazyWithRetry(() =>
  import('./components/BoardHonorsSection').then((m) => ({ default: m.BoardHonorsSection }))
);
const StudentAchievementsSection = lazyWithRetry(() =>
  import('./components/StudentAchievementsSection').then((m) => ({
    default: m.StudentAchievementsSection,
  }))
);
const NoticesSection = lazyWithRetry(() =>
  import('./components/NoticesSection').then((m) => ({ default: m.NoticesSection }))
);
const FacebookEventsTracker = lazyWithRetry(() =>
  import('./components/FacebookEventsTracker').then((m) => ({
    default: m.FacebookEventsTracker,
  }))
);
const AboutAndHistory = lazyWithRetry(() =>
  import('./components/AboutAndHistory').then((m) => ({ default: m.AboutAndHistory }))
);
const PrincipalSection = lazyWithRetry(() =>
  import('./components/PrincipalSection').then((m) => ({ default: m.PrincipalSection }))
);
const AcademicsSection = lazyWithRetry(() =>
  import('./components/AcademicsSection').then((m) => ({ default: m.AcademicsSection }))
);
const DepartmentsSection = lazyWithRetry(() =>
  import('./components/DepartmentsSection').then((m) => ({ default: m.DepartmentsSection }))
);
const VirtualCampusTour = lazyWithRetry(() =>
  import('./components/VirtualCampusTour').then((m) => ({ default: m.VirtualCampusTour }))
);
const CollegeLibrarySection = lazyWithRetry(() =>
  import('./components/CollegeLibrarySection').then((m) => ({
    default: m.CollegeLibrarySection,
  }))
);
const CollegeLabsSection = lazyWithRetry(() =>
  import('./components/CollegeLabsSection').then((m) => ({ default: m.CollegeLabsSection }))
);
const DigitalLibrarySection = lazyWithRetry(() =>
  import('./components/DigitalLibrarySection').then((m) => ({
    default: m.DigitalLibrarySection,
  }))
);
const ExamPrepSection = lazyWithRetry(() =>
  import('./components/ExamPrepSection').then((m) => ({
    default: m.ExamPrepSection,
  }))
);
const AlumnaeSection = lazyWithRetry(() =>
  import('./components/AlumnaeSection').then((m) => ({ default: m.AlumnaeSection }))
);
const AdmissionsSection = lazyWithRetry(() =>
  import('./components/AdmissionsSection').then((m) => ({ default: m.AdmissionsSection }))
);
const AcademicCalendarSection = lazyWithRetry(() =>
  import('./components/AcademicCalendarSection').then((m) => ({
    default: m.AcademicCalendarSection,
  }))
);
const StudentResourcesSection = lazyWithRetry(() =>
  import('./components/StudentResourcesSection').then((m) => ({
    default: m.StudentResourcesSection,
  }))
);
const CemisAttendanceSection = lazyWithRetry(() =>
  import('./components/CemisAttendanceSection').then((m) => ({
    default: m.CemisAttendanceSection,
  }))
);
const GallerySection = lazyWithRetry(() =>
  import('./components/GallerySection').then((m) => ({ default: m.GallerySection }))
);
const FacebookCommunitySection = lazyWithRetry(() =>
  import('./components/FacebookCommunitySection').then((m) => ({
    default: m.FacebookCommunitySection,
  }))
);
const ContactAndLocation = lazyWithRetry(() =>
  import('./components/ContactAndLocation').then((m) => ({ default: m.ContactAndLocation }))
);
const Footer = lazyWithRetry(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const EnquiryModal = lazyWithRetry(() =>
  import('./components/EnquiryModal').then((m) => ({ default: m.EnquiryModal }))
);
const AdminInboxModal = lazyWithRetry(() =>
  import('./components/AdminInboxModal').then((m) => ({ default: m.AdminInboxModal }))
);

export default function App() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <FirebaseProvider>
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-emerald-950">
        {/* Top Utility Bar with Live PKT Time & Office Status */}
        <TopUtilityBar />

        {/* Main Navigation Bar */}
        <Navbar onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

        {/* Quick Floating Call Helpline Widget */}
        <FloatingCallWidget />

        {/* Right-Side Floating Quick Access Navigation Menu */}
        <FloatingQuickAccess />

        {/* Main Page Sections */}
        <main className="flex-1">
          {/* Hero Section (Eager Above-the-Fold) */}
          <Hero onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

          {/* Board Examination Honors & Top Positions Spotlight */}
          <LazySection id="board-results" minHeight="min-h-[320px]" placeholderClassName="bg-[#f4f7f4]">
            <BoardHonorsSection />
          </LazySection>

          {/* Student Achievements & Roll of Honor */}
          <LazySection id="student-achievements" minHeight="min-h-[320px]" placeholderClassName="bg-white">
            <StudentAchievementsSection />
          </LazySection>

          {/* Official News & Announcements Board */}
          <LazySection id="notices" minHeight="min-h-[260px]" placeholderClassName="bg-white">
            <NoticesSection />
          </LazySection>

          {/* Facebook 2026 Live College Events Scrolling Window Tracker */}
          <LazySection id="events" minHeight="min-h-[260px]" placeholderClassName="bg-[#021f19]">
            <FacebookEventsTracker />
          </LazySection>

          {/* 70-Year History, Legacy & Core Pillars */}
          <LazySection id="about" aliasIds={['history']} minHeight="min-h-[360px]" placeholderClassName="bg-[#064b36]">
            <AboutAndHistory />
          </LazySection>

          {/* Principal's Desk: Prof. Yasmeen Panhwar */}
          <LazySection id="principal" minHeight="min-h-[340px]" placeholderClassName="bg-[#042f28]">
            <PrincipalSection />
          </LazySection>

          {/* Academic Faculties & Programs Explorer */}
          <LazySection id="academics" minHeight="min-h-[340px]" placeholderClassName="bg-white">
            <AcademicsSection />
          </LazySection>

          {/* Academic Departments, Laboratories & Subject Chairs */}
          <LazySection id="departments" minHeight="min-h-[360px]" placeholderClassName="bg-[#fbfdfa]">
            <DepartmentsSection onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />
          </LazySection>

          {/* Interactive Virtual Campus Tour */}
          <LazySection id="campus-tour" aliasIds={['campus-virtual-map']} minHeight="min-h-[420px]" placeholderClassName="bg-[#042f28]">
            <VirtualCampusTour />
          </LazySection>

          {/* Central College Library: Photos, Collections & Membership Rules */}
          <LazySection id="college-library" minHeight="min-h-[340px]" placeholderClassName="bg-white">
            <CollegeLibrarySection />
          </LazySection>

          {/* College Laboratories: Computer Science, Physics, Chemistry, Zoology & Botany */}
          <LazySection id="college-labs" minHeight="min-h-[340px]" placeholderClassName="bg-[#f8faf7]">
            <CollegeLabsSection />
          </LazySection>

          {/* Digital Library: Syllabus Book Photos & Internet Links */}
          <LazySection id="digital-library" minHeight="min-h-[320px]" placeholderClassName="bg-[#f8faf7]">
            <DigitalLibrarySection />
          </LazySection>

          {/* Dynamic Past Papers & Examination Prep Hub */}
          <LazySection id="exam-prep" aliasIds={['ai-tutor']} minHeight="min-h-[400px]" placeholderClassName="bg-[#032922]">
            <ExamPrepSection />
          </LazySection>

          {/* Alumnae Success Stories */}
          <LazySection id="alumnae" minHeight="min-h-[340px]" placeholderClassName="bg-white">
            <AlumnaeSection />
          </LazySection>

          {/* SECCAP Centralized Admissions Guide */}
          <LazySection id="admissions" minHeight="min-h-[340px]" placeholderClassName="bg-[#042f28]">
            <AdmissionsSection />
          </LazySection>

          {/* Academic Calendar (2026–2027 Key Dates & Examinations) */}
          <LazySection id="academic-calendar" minHeight="min-h-[300px]" placeholderClassName="bg-[#faf8f4]">
            <AcademicCalendarSection />
          </LazySection>

          {/* Student Resources: Downloadable Forms, Enrollment Slips & Registration Guides */}
          <LazySection id="student-resources" minHeight="min-h-[300px]" placeholderClassName="bg-[#f8faf7]">
            <StudentResourcesSection />
          </LazySection>

          {/* CEMIS Biometric Attendance & Faculty Portal (Sindh College Education Dept) */}
          <LazySection id="cemis-attendance" minHeight="min-h-[280px]" placeholderClassName="bg-white">
            <CemisAttendanceSection />
          </LazySection>

          {/* Campus Gallery & Archives */}
          <LazySection id="gallery" minHeight="min-h-[320px]" placeholderClassName="bg-[#f8faf7]">
            <GallerySection />
          </LazySection>

          {/* Official Facebook Community Updates */}
          <LazySection id="facebook-community" aliasIds={['facebook-updates']} minHeight="min-h-[360px]" placeholderClassName="bg-[#042f28]">
            <FacebookCommunitySection />
          </LazySection>

          {/* Location, Google Map, QR Code, Working Contact Form & FAQs */}
          <LazySection id="contact" aliasIds={['faq', 'enquiryFormContainer']} minHeight="min-h-[400px]" placeholderClassName="bg-white">
            <ContactAndLocation />
          </LazySection>
        </main>

        {/* Institutional Footer */}
        <LazySection id="site-footer" minHeight="min-h-[200px]" placeholderClassName="bg-[#021914]">
          <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />
        </LazySection>

        {/* Lazy-loaded Modals (only downloaded when opened) */}
        {isEnquiryModalOpen && (
          <Suspense fallback={null}>
            <EnquiryModal
              isOpen={isEnquiryModalOpen}
              onClose={() => setIsEnquiryModalOpen(false)}
            />
          </Suspense>
        )}

        {isAdminModalOpen && (
          <Suspense fallback={null}>
            <AdminInboxModal
              isOpen={isAdminModalOpen}
              onClose={() => setIsAdminModalOpen(false)}
            />
          </Suspense>
        )}
        </div>
      </FirebaseProvider>
    </LanguageProvider>
  );
}
