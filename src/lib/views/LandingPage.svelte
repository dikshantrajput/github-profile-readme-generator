<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly, slide } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import Button from "$lib/components/Button.svelte";
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";

    let heroVisible = true;
    let featuresVisible = true;

    const stars = tweened(0, {
        duration: 2000,
        easing: cubicOut,
    });
    const users = tweened(0, {
        duration: 2000,
        easing: cubicOut,
    });

    onMount(() => {
        stars.set(1200);
        users.set(5000);
    });

    const featuresData = [
        {
            title: "One-Click Generation",
            description:
                "Connect your GitHub account and generate your README instantly.",
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
        },
        {
            title: "11+ Unique Templates",
            description:
                "Choose from a variety of themes from minimal to gaming-inspired.",
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`,
        },
        {
            title: "Real-time Preview",
            description:
                "Preview your README changes instantly as you customize.",
            icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`,
        },
    ];

    const allTemplates = [
        {
            id: 1,
            title: "Minimalist Masterpiece",
            description:
                "A clean and straightforward README template that highlights your projects and skills without any distractions.",
            icon: "📝",
        },
        {
            id: 2,
            title: "Matrix Profile",
            description:
                "Generates a matrix-style GitHub profile overview with developer statistics, repository data, and visual elements.",
            icon: "⭐",
        },
        {
            id: 3,
            title: "DevOps Profile Generator",
            description:
                "Create a dynamic and detailed DevOps profile, showcasing your GitHub contributions, infrastructure metrics, technology stack, and deployment insights—all in a visually engaging template.",
            icon: "🎯",
        },
        {
            id: 4,
            title: "Trading Dashboard",
            description:
                "Generates a trading dashboard-inspired GitHub profile template, including repository metrics, language portfolio, top repositories, and personalized developer statistics.",
            icon: "🎨",
        },
        {
            id: 5,
            title: "Developer's Cookbook Template",
            description:
                'Showcase your GitHub profile as a fun, culinary-inspired "Developer\'s Cookbook" highlighting your top repositories, languages, and contributions as signature dishes and ingredients.',
            icon: "👨‍💻",
        },
        {
            id: 6,
            title: "Quest Log",
            description:
                "Level up your GitHub profile with this RPG-inspired README template, perfect for showcasing your coding adventures and achievements.",
            icon: "🌟",
        },
        {
            id: 7,
            title: "Developer's Journey Map",
            description:
                "Personalized, visual journey of your GitHub contributions, projects, and achievements, highlighting your coding milestones, language expertise, and project stats in an interactive and engaging format.",
            icon: "📚",
        },
        {
            id: 8,
            title: "Neon Synthwave",
            description:
                "Creates a neon synthwave-themed GitHub profile template showcasing user stats, featured projects, and a visually striking retro design.",
            icon: "⌨️",
        },
        {
            id: 9,
            title: "Research Paper",
            description:
                "Creates a research-paper formatted template analyzing a GitHub user's repository statistics and contributions.",
            icon: "🏢",
        },
        {
            id: 10,
            title: "Neon Reflections",
            description:
                "A vibrant README template that combines glassy aesthetics and neon colors to create a visually striking profile.",
            icon: "🎓",
        },
        {
            id: 11,
            title: "Developer Sports Card",
            description:
                "Personalized sports card highlighting your GitHub profile, showcasing key stats, top repositories, and skill insights in a fun and engaging way.",
            icon: "📦",
        },
    ];

    let templates = allTemplates.slice(0, 4);

    let selectedTemplate = null;
    let isSigningIn = false;

    const handleSignIn: SubmitFunction = () => {
        isSigningIn = true;

        return ({ update }) => {
            isSigningIn = false;
            update();
        };
    };

    let viewAllTemplates = false;
    const toggleAllTemplates = () => {
        viewAllTemplates = !viewAllTemplates;
        templates = viewAllTemplates ? allTemplates : allTemplates.slice(0, 4);
    };

    let isMenuOpen = false;
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };
</script>

<div class="min-h-screen bg-background text-text">
    <script>
        let isMenuOpen = false;
        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
        };
    </script>

    <nav
        class="sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-primary/10"
    >
        <div class="container mx-auto px-4 sm:px-6">
            <div class="flex items-center justify-between h-14 sm:h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <span
                        class="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                    >
                        ReadmeGen
                    </span>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-6">
                    <a
                        href="#features"
                        class="text-text-muted hover:text-primary transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#templates"
                        class="text-text-muted hover:text-primary transition-colors"
                    >
                        Templates
                    </a>
                </div>

                <!-- Login Button - Desktop -->
                <div class="hidden md:block">
                    <form
                        action="/auth?/signinWithGithubOAuth"
                        method="post"
                        use:enhance={handleSignIn}
                    >
                        <Button
                            type="submit"
                            disabled={isSigningIn}
                            loading={isSigningIn}
                            variant="primary"
                            customClasses="px-4 py-2 text-sm"
                        >
                            Login with GitHub
                        </Button>
                    </form>
                </div>

                <!-- Mobile Menu Button -->
                <button
                    class="md:hidden p-2 rounded-md text-text-muted hover:text-primary"
                    on:click={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {#if !isMenuOpen}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    {/if}
                </button>
            </div>

            <!-- Mobile Menu -->
            {#if isMenuOpen}
                <div
                    class="md:hidden py-4 border-t border-primary/10"
                    transition:slide
                >
                    <div class="flex flex-col space-y-4">
                        <a
                            href="#features"
                            class="text-text-muted hover:text-primary transition-colors px-4"
                            on:click={toggleMenu}
                        >
                            Features
                        </a>
                        <a
                            href="#templates"
                            class="text-text-muted hover:text-primary transition-colors px-4"
                            on:click={toggleMenu}
                        >
                            Templates
                        </a>
                        <div class="px-4">
                            <form
                                action="/auth?/signinWithGithubOAuth"
                                method="post"
                                use:enhance={handleSignIn}
                            >
                                <Button
                                    type="submit"
                                    disabled={isSigningIn}
                                    loading={isSigningIn}
                                    variant="primary"
                                    customClasses="w-full py-2 text-sm"
                                >
                                    Login with GitHub
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </nav>

    <!-- Hero Section -->
    <section
        id="hero"
        class="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-32"
    >
        {#if heroVisible}
            <div
                class="container mx-auto px-4 sm:px-6"
                in:fade={{ duration: 1000, delay: 200 }}
            >
                <div class="relative">
                    <!-- Gradient Orbs - Adjusted for better mobile display -->
                    <div
                        class="absolute top-0 -left-4 w-48 h-48 md:w-72 md:h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                    />
                    <div
                        class="absolute top-0 -right-4 w-48 h-48 md:w-72 md:h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                    />
                    <div
                        class="absolute -bottom-8 left-20 w-48 h-48 md:w-72 md:h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                    />

                    <div
                        class="relative text-center max-w-4xl mx-auto px-4 sm:px-6"
                    >
                        <h1
                            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                            in:fly={{ y: 50, duration: 1000, delay: 400 }}
                        >
                            Make Your GitHub Profile Stand Out
                        </h1>
                        <p
                            class="text-lg sm:text-xl text-text-muted mb-8 md:mb-12 px-2"
                            in:fly={{ y: 50, duration: 1000, delay: 600 }}
                        >
                            Create a professional GitHub profile README in
                            minutes with our intuitive generator. Choose from
                            beautiful templates and customize them to match your
                            style.
                        </p>

                        <div
                            class="flex flex-col sm:flex-row gap-4 justify-center px-4"
                            in:fly={{ y: 50, duration: 1000, delay: 800 }}
                        >
                            <form
                                action="/auth?/signinWithGithubOAuth"
                                method="post"
                                use:enhance={handleSignIn}
                                class="w-full sm:w-auto"
                            >
                                <Button
                                    type="submit"
                                    disabled={isSigningIn}
                                    loading={isSigningIn}
                                    variant="primary"
                                    customClasses="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 ease-in-out sm:hover:scale-105 hover:scale-101 shadow-lg hover:shadow-primary/20"
                                >
                                    Generate README
                                </Button>
                            </form>
                            <button
                                class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary/20 hover:border-primary rounded-lg transition-all duration-200 ease-in-out sm:hover:scale-105 hover:scale-101"
                            >
                                View Examples
                            </button>
                        </div>

                        <div
                            class="mt-12 md:mt-16 grid grid-cols-2 gap-4 sm:gap-8 max-w-lg mx-auto hidden"
                            in:fly={{ y: 50, duration: 1000, delay: 1000 }}
                        >
                            <div class="text-center">
                                <div
                                    class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2"
                                >
                                    {#if heroVisible}
                                        {$stars.toFixed(0)}+
                                    {/if}
                                </div>
                                <div
                                    class="text-sm sm:text-base text-text-muted"
                                >
                                    GitHub Stars
                                </div>
                            </div>
                            <div class="text-center">
                                <div
                                    class="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2"
                                >
                                    {#if heroVisible}
                                        {$users.toFixed(0)}+
                                    {/if}
                                </div>
                                <div
                                    class="text-sm sm:text-base text-text-muted"
                                >
                                    Active Users
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </section>

    <section
        id="features"
        class="py-32 bg-gradient-to-b from-background-light to-background dark:from-background-dark dark:to-background relative overflow-hidden"
    >
        {#if featuresVisible}
            <div class="container mx-auto px-6" in:fade={{ duration: 1000 }}>
                <h2
                    class="text-4xl font-bold text-center mb-6"
                    in:fly={{ y: 50, duration: 1000 }}
                >
                    Powerful Features
                </h2>
                <p
                    class="text-center text-text-muted mb-16 max-w-2xl mx-auto"
                    in:fly={{ y: 50, duration: 1000, delay: 200 }}
                >
                    Everything you need to create a stunning GitHub profile
                    README that stands out from the crowd.
                </p>

                <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-8">
                    {#each featuresData as feature, i}
                        <div
                            in:fly={{ y: 50, duration: 1000, delay: 200 * i }}
                            class="group relative p-8 rounded-xl bg-background shadow-lg dark:shadow-none border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 min-w-[300px]"
                        >
                            <div
                                class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <div class="relative">
                                <div
                                    class="w-12 h-12 mb-6 text-primary p-2 bg-primary/10 rounded-lg flex justify-center items-center"
                                >
                                    {@html feature.icon}
                                </div>
                                <h3 class="sm:text-xl text-lg font-bold mb-4">
                                    {feature.title}
                                </h3>
                                <p class="text-text-muted sm:text-lg text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </section>

    <section
        class="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden"
        id="templates"
    >
        <div class="container mx-auto px-4 sm:px-6">
            <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">
                Choose Your Style
            </h2>
            <p
                class="text-center text-text-muted mb-8 sm:mb-16 max-w-2xl mx-auto px-4"
            >
                From minimalist to gaming-inspired, find the perfect template
                that matches your personality.
            </p>
            <form
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6"
                action="/auth?/signinWithGithubOAuth"
                method="post"
                use:enhance={handleSignIn}
            >
                {#each templates as template (template.id)}
                    <div
                        in:fly={{
                            y: 50,
                            duration: 400,
                            delay: 50 * template.id,
                        }}
                        class="w-full"
                    >
                        <Button
                            type="submit"
                            disabled={isSigningIn}
                            loading={isSigningIn}
                            customClasses="h-full group relative !p-6 rounded-xl bg-background-light dark:bg-background-dark border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer !block "
                            variant="primary"
                        >
                            <div class="text-3xl sm:text-4xl mb-3 sm:mb-4">
                                {template.icon}
                            </div>
                            <h3 class="text-lg sm:text-xl font-bold mb-2">
                                {template.title}
                            </h3>
                            <p class="text-sm text-text-muted line-clamp-2">
                                {template.description}
                            </p>
                            <div
                                class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                            />
                        </Button>
                    </div>
                {/each}
            </form>
            {#if !viewAllTemplates}
                <div class="text-center mt-8 sm:mt-12">
                    <button
                        class="w-auto px-6 sm:px-8 py-4 bg-background-light dark:bg-background-dark border border-primary/20 hover:border-primary rounded-lg transition-all duration-200 hover:-translate-y-1"
                        on:click={toggleAllTemplates}
                    >
                        View All Templates
                    </button>
                </div>
            {/if}
        </div>
    </section>

    <section class="relative overflow-hidden py-24 sm:py-32 md:py-44">
        <div
            class="container mx-auto px-4 sm:px-6"
            in:fade={{ duration: 1000, delay: 200 }}
        >
            <div class="relative">
                <!-- Gradient Orbs - Responsive sizes -->
                <div
                    class="absolute top-0 -left-4 w-48 h-48 sm:w-64 md:w-72 sm:h-64 md:h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                />
                <div
                    class="absolute top-0 -right-4 w-48 h-48 sm:w-64 md:w-72 sm:h-64 md:h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                />
                <div
                    class="absolute -bottom-8 left-10 sm:left-20 w-48 h-48 sm:w-64 md:w-72 sm:h-64 md:h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                />

                <div
                    class="container mx-auto px-4 sm:px-6 text-center relative z-10"
                >
                    <h2
                        class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
                    >
                        Ready to Create Your Profile?
                    </h2>
                    <p
                        class="text-text-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
                    >
                        Enhance your GitHub presence now.
                    </p>
                    <form
                        action="/auth?/signinWithGithubOAuth"
                        method="post"
                        use:enhance={handleSignIn}
                        class="flex justify-center"
                    >
                        <Button
                            type="submit"
                            disabled={isSigningIn}
                            loading={isSigningIn}
                            variant="primary"
                            customClasses="w-auto px-6 sm:px-8 py-3 border border-primary/20 hover:border-primary rounded-lg transition-all duration-200 hover:-translate-y-1 sm:text-base text-sm"
                        >
                            Get Started Now
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer
        class="bg-background-light dark:bg-background-dark border-t border-primary/10"
    >
        <div class="container mx-auto">
            <!-- <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">ReadmeGen</h3>
                    <p class="text-text-muted">
                        Make your GitHub profile stand out with our README
                        generator.
                    </p>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">Product</h4>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href="#features"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Features</a
                            >
                        </li>
                        <li>
                            <a
                                href="#templates"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Templates</a
                            >
                        </li>
                        <li>
                            <a
                                href="#pricing"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Pricing</a
                            >
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">Resources</h4>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href="#docs"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Documentation</a
                            >
                        </li>
                        <li>
                            <a
                                href="#examples"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Examples</a
                            >
                        </li>
                        <li>
                            <a
                                href="#blog"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Blog</a
                            >
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">Connect</h4>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href="#github"
                                class="text-text-muted hover:text-primary transition-colors"
                                >GitHub</a
                            >
                        </li>
                        <li>
                            <a
                                href="#twitter"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Twitter</a
                            >
                        </li>
                        <li>
                            <a
                                href="#discord"
                                class="text-text-muted hover:text-primary transition-colors"
                                >Discord</a
                            >
                        </li>
                    </ul>
                </div>
            </div> -->

            <div
                class="py-8 border-t border-primary/10 flex flex-col md:flex-row justify-center items-center"
            >
                <p class="text-text-muted">
                    © 2024 ReadmeGen. All rights reserved.
                </p>
                <!-- <div class="flex space-x-6 mt-4 md:mt-0">
                    <a
                        href="#terms"
                        class="text-text-muted hover:text-primary transition-colors"
                        >Terms</a
                    >
                    <a
                        href="#privacy"
                        class="text-text-muted hover:text-primary transition-colors"
                        >Privacy</a
                    >
                    <a
                        href="#cookies"
                        class="text-text-muted hover:text-primary transition-colors"
                        >Cookies</a
                    >
                </div> -->
            </div>
        </div>
    </footer>
</div>

<style>
    @keyframes blob {
        0% {
            transform: translate(0px, 0px) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
            transform: translate(0px, 0px) scale(1);
        }
    }

    .animate-blob {
        animation: blob 7s infinite;
    }

    .animation-delay-2000 {
        animation-delay: 2s;
    }

    .animation-delay-4000 {
        animation-delay: 4s;
    }
</style>
