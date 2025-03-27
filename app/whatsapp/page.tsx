'use client'; // Indica que este é um Client Component

import ContactButton from './components/ContactButton/component';

export default function WhatsAppsPage() {
    return (
        <div>
            <ContactButton></ContactButton>
            <ContactButton></ContactButton>
            <ContactButton></ContactButton>
            <ContactButton></ContactButton>
        </div>
    );
}