import { lazy } from 'react';

// Lazy load components for better performance
export const LazyProjects = lazy(() => import('@/components/Projects'));
export const LazyClientLogos = lazy(() => import('@/components/ClientLogos'));
export const LazyTestimonials = lazy(() => import('@/components/Testimonials'));
export const LazyWorkflow = lazy(() => import('@/components/Workflow'));
export const LazyFAQ = lazy(() => import('@/components/FAQ'));