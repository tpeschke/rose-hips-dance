'use client'
import BackgroundImages from '../components/backgroundImages/backgroundImages'
import RotatingSun from '../homeComponents/rotatingSun/rotatingSun'
import { lemonade, mhiora } from '../utilities/fonts'
import Image from "next/image";
import './contact.css'
import { Ref, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function Contact() {
    const form: Ref<HTMLFormElement> | undefined = useRef(null);
    
    const sendEmail = (event: any) => {
        event.preventDefault();

        const interestInClass = form?.current?.getElementsByTagName('input')[0].checked
        if (!interestInClass && form?.current && process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_KEY) {
            emailjs
                .sendForm(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, form.current, {
                    publicKey: process.env.EMAILJS_KEY,
                })
                .then(
                    () => {
                        toast.success('Email has been sent. I\'ll reach out shortly!')
                    },
                    (error: any) => {
                        toast.error('FAILED...', error.text)
                    },
                );
        } else {
            toast.error('The form wasn\'t set up properly; please retry reloading.')
        }
    };

    return (
        <div className="contact-page">
            <BackgroundImages />
            <RotatingSun />
            <div className="contact-card">
                <p className="eyebrow">Questions?</p>
                <h1 className={`${mhiora.className} antialiased`}>Contact</h1>
                <div className="eyebrow">
                    <Image
                        aria-hidden
                        src="/star.png"
                        alt="star"
                        width={35}
                        height={35}
                    />
                </div>

                <form ref={form} onSubmit={sendEmail}>
                    <label>Are you interested in this class?</label>
                    <input type="checkbox" name="class_interest" />
                    <input type="text" name="name" placeholder='Name' required={true} />
                    <input type="email" name="email" placeholder='Email' required={true} />
                    <textarea name="message" placeholder='Message' className={`${lemonade.className} antialiased`} required={true} />
                    <button type="submit" className={`${mhiora.className} antialiased gold`}> Send </button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    )
}