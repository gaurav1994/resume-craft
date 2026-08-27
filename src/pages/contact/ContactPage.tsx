import { Check, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ContactPage.module.css'

type ContactFormValues = {
    subject: string
    email: string
    message: string
}

function ContactPage() {
    const [sent, setSent] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>()

    const onSubmit = () => {
        setSent(true)
        reset()
    }

    return (
        <main className={styles.page}>
            <div className={styles.layout}>
                <section className={styles.intro}>
                    <p className="eyebrow">We&apos;re here to help</p>
                    <h1 className={styles.heading}>Let&apos;s talk.</h1>
                    <p className={styles.description}>Have a question about building your resume, found something that could be better, or simply want to say hello? Send us a note and we&apos;ll get back to you.</p>
                    <p className={styles.note}>We usually reply within one business day. Your message stays private and is only used to respond to your request.</p>
                </section>
                <section className={styles.formCard} aria-labelledby="contact-heading">
                    <div className="mb-6 flex items-center gap-3 border-b border-[#e5ebe7] pb-5"><div className="grid size-10 place-items-center rounded-lg bg-[#fbe8e2] text-[#b75545]"><Mail size={18} aria-hidden="true" /></div><div><h2 className="m-0 text-lg font-bold text-[#18232b]" id="contact-heading">Send a message</h2><p className="mt-1 text-xs text-[#87938e]">Tell us what&apos;s on your mind.</p></div></div>
                    {sent ? <div className={styles.success}><Check className="mb-2 text-[#4a9362]" size={20} aria-hidden="true" /><strong className="block">Message sent.</strong> Thanks for reaching out. We&apos;ll be in touch soon.</div> : 
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <label className={styles.field}><span className={styles.label}>Subject</span><input className={styles.input} placeholder="How can we help?" {...register('subject', { required: 'Please add a subject' })} />{errors.subject ? <span className={styles.error}>{errors.subject.message}</span> : null}</label>
                        <label className={styles.field}><span className={styles.label}>Your email address</span><input className={styles.input} type="email" placeholder="you@example.com" {...register('email', { required: 'Please add your email address', validate: (value) => { const [localPart, domain] = value.split('@'); return Boolean(localPart && domain && domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.')) || 'Enter a valid email address' } })} />{errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}</label>
                        <label className={styles.field}><span className={styles.label}>Message</span><textarea className={styles.textarea} placeholder="Write your message here..." {...register('message', { required: 'Please add a message' })} />{errors.message ? <span className={styles.error}>{errors.message.message}</span> : null}</label>
                        <button className={styles.submit} type="submit"><Send size={16} aria-hidden="true" /> Send message</button>
                    </form>}
                </section>
            </div>
        </main>
    )
}

export default ContactPage
