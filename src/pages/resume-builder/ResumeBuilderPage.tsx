import { ArrowLeft, Check, FileText, Save } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import BuilderSidebar from "../../components/resume-builder/BuilderSidebar";
import styles from "./ResumeBuilderPage.module.css";
import {
    defaultResumes,
    getResumes,
    saveResumes,
    type Resume,
} from "../resumes/resumeStore";

type BuilderValues = Pick<Resume,"title" | "role" | "fullName" | "email" | "phone" | "location"> & { summary: string };
type ResumeBuilderPageProps = Readonly<{ mode?: "create" | "edit" }>;

const blankResume: BuilderValues = {
    title: "My new resume",
    role: "Your professional title",
    fullName: "Your Name",
    email: "you@example.com",
    phone: "+91 00000 00000",
    location: "Your city",
    summary:
        "A concise introduction that connects your experience to the role you want next.",
};

function ResumeBuilderPage({ mode }: ResumeBuilderPageProps) {
    const { resumeId } = useParams();
    const navigate = useNavigate();
    const existingResume = mode === "edit" && resumeId ? getResumes().find((item) => item.id === Number(resumeId)) : undefined;
    let initialValues: BuilderValues | undefined;
    if (existingResume) {
        initialValues = { ...existingResume, summary: existingResume.summary.profSummary };
    } else if (mode === "create") {
        initialValues = blankResume;
    }
    const [activeSection, setActiveSection] = useState("Basics");
    const [saved, setSaved] = useState(false);
    const { control, register, handleSubmit, formState: { errors },} = useForm<BuilderValues>({ defaultValues: initialValues });
    const values = useWatch({ control });

    if (mode === "edit" && resumeId && !existingResume) {
        return (
            <main className={styles.page}>
                <div className="mx-auto max-w-295">
                    <p className="eyebrow">ResumeCraft</p>
                    <h1 className="font-serif text-5xl font-bold text-[#18232b]">
                        Resume not found
                    </h1>
                    <Link
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#18232b] px-5 py-3 text-sm font-bold text-white"
                        to="/resumes"
                    >
                        <ArrowLeft size={16} /> Back to resumes
                    </Link>
                </div>
            </main>
        );
    }

    const onSubmit = (formValues: BuilderValues) => {
        const current = getResumes();
        const id =
            existingResume?.id ??
            Math.max(
                ...current.map((item) => item.id),
                ...defaultResumes.map((item) => item.id),
            ) + 1;
        const nextResume: Resume = {
            ...(existingResume ?? defaultResumes[0]),
            ...formValues,
            id,
            updated: "Updated just now",
            currentRole: formValues.role,
            contactInformation: {
                ...(existingResume?.contactInformation ?? defaultResumes[0].contactInformation),
                firstName: formValues.fullName.split(" ")[0] ?? formValues.fullName,
                lastName: formValues.fullName.split(" ").slice(1).join(" "),
                email: formValues.email,
                phone: formValues.phone,
                address: formValues.location,
            },
            summary: {
                ...(existingResume?.summary ?? defaultResumes[0].summary),
                profSummary: formValues.summary,
            },
            experience: existingResume?.experience ?? [],
        };
        saveResumes(
            existingResume
                ? current.map((item) => (item.id === id ? nextResume : item))
                : [...current, nextResume],
        );
        setSaved(true);
        window.setTimeout(() => navigate("/resumes"), 500);
    };

    const fieldClass =
        "h-11 w-full rounded-lg border border-[#d5dfda] bg-white px-3 text-sm text-[#18232b] outline-none transition placeholder:text-[#a2adaa] focus:border-[#e07f6c] focus:ring-4 focus:ring-[#e07f6c]/10";

    return (
        <main className={styles.page}>
            <section className={styles.shell}>
                <header className={styles.topbar}>
                    <div className={styles.titleGroup}>
                        <div className={styles.titleMark}>
                            <FileText size={17} />
                        </div>
                        <div>
                            <h1 className={styles.title}>{mode === "create" ? "Create a resume" : "Resume builder"}</h1>
                            <p className={styles.subtitle}>
                                {mode === "create" ? "Start with a template built around your story" : "Shape a version that sounds like you"}
                            </p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Link
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-[#6c7975] hover:bg-[#f1f4f1]"
                            to="/resumes"
                        >
                            <ArrowLeft size={14} /> Exit
                        </Link>
                        <button
                            className="inline-flex items-center gap-2 rounded-lg bg-[#e07f6c] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#cf6d5b]"
                            type="submit"
                            form="resume-builder-form"
                        >
                            {saved ? <Check size={14} /> : <Save size={14} />}{" "}
                            {saved ? "Saved" : "Save resume"}
                        </button>
                    </div>
                </header>
                <div className={styles.layout}>
                    <BuilderSidebar
                        activeSection={activeSection}
                        onSelect={setActiveSection}
                    />
                    <form
                        id="resume-builder-form"
                        className={styles.formPane}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={styles.formHeader}>
                            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[1.8px] text-[#e07f6c]">
                                Section {activeSection}
                            </p>
                            <h1>
                                {activeSection === "Basics"
                                    ? "Start with the essentials"
                                    : `Build your ${activeSection.toLowerCase()}`}
                            </h1>
                            <p>
                                These details help your template tell a focused, memorable
                                story.
                            </p>
                        </div>
                        {activeSection === "Basics" ? (
                            <div className={`${styles.formFields} space-y-5`}>
                                <label className="block">
                                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#65736e]">
                                        Resume name
                                    </span>
                                    <input
                                        className={fieldClass}
                                        {...register("title", { required: "Name your resume" })}
                                    />
                                    {errors.title ? (
                                        <small className="mt-1 block text-xs text-red-600">
                                            {errors.title.message}
                                        </small>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#65736e]">
                                        Professional title
                                    </span>
                                    <input className={fieldClass} {...register("role")} />
                                </label>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#65736e]">
                                            Full name
                                        </span>
                                        <input className={fieldClass} {...register("fullName")} />
                                    </label>
                                    <label className="block">
                                        <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#65736e]">
                                            Email
                                        </span>
                                        <input
                                            className={fieldClass}
                                            type="email"
                                            {...register("email")}
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#65736e]">
                                            Phone
                                        </span>
                                        <input className={fieldClass} {...register("phone")} />
                                    </label>
                                    <label className="block">
                                        <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#65736e]">
                                            Location
                                        </span>
                                        <input className={fieldClass} {...register("location")} />
                                    </label>
                                </div>
                                <label className="block">
                                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#65736e]">
                                        Professional summary
                                    </span>
                                    <textarea
                                        className="min-h-32 w-full resize-y rounded-lg border border-[#d5dfda] bg-white px-3 py-3 text-sm leading-6 text-[#18232b] outline-none transition focus:border-[#e07f6c] focus:ring-4 focus:ring-[#e07f6c]/10"
                                        {...register("summary")}
                                    />
                                </label>
                            </div>
                        ) : (
                            <div className="mt-8 rounded-xl border border-dashed border-[#d5dfda] bg-white px-5 py-8">
                                <p className="text-sm font-bold text-[#18232b]">
                                    {activeSection} fields are ready to add.
                                </p>
                                <p className="mt-2 text-sm leading-6 text-[#798582]">
                                    Choose Basics to update the resume identity, or save this
                                    template and continue expanding this section next.
                                </p>
                            </div>
                        )}
                    </form>
                    <aside className={styles.previewPane}>
                        <p className={styles.previewLabel}>Live template preview</p>
                        <div className={styles.preview}>
                            <h2>{values.fullName || "Your Name"}</h2>
                            <h3>{values.role || "Professional title"}</h3>
                            <p className={styles.contact}>
                                {values.email} · {values.phone}
                                <br />
                                {values.location}
                            </p>
                            <div className={styles.previewLine} />
                            <h4>Profile</h4>
                            <p>{values.summary}</p>
                            <h4>Experience</h4>
                            <div className="mt-2 h-1 w-3/4 bg-[#e3e9e5]" />
                            <div className="mt-2 h-1 w-full bg-[#e3e9e5]" />
                            <div className="mt-2 h-1 w-5/6 bg-[#e3e9e5]" />
                            <h4>Education</h4>
                            <div className="mt-2 h-1 w-2/3 bg-[#e3e9e5]" />
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

export default ResumeBuilderPage;
