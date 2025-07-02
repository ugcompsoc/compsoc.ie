import * as React from 'react'
import { cn } from '@/lib/utils'

function Post({ className, ...props }: React.ComponentProps<'article'>) {
    return (
        <article
            data-slot="post"
            className={cn(
                'bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg p-6 transition-all duration-300 ease-out hover:bg-card/80 hover:border-border/50',
                className,
            )}
            {...props}
        />
    )
}

function PostHeader({ className, ...props }: React.ComponentProps<'header'>) {
    return <header data-slot="post-header" className={cn('mb-4', className)} {...props} />
}

function PostTitle({ className, ...props }: React.ComponentProps<'h3'>) {
    return (
        <h3
            data-slot="post-title"
            className={cn('text-lg font-semibold text-foreground mb-2 leading-tight', className)}
            {...props}
        />
    )
}

function PostMeta({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="post-meta"
            className={cn(
                'flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground mb-4',
                className,
            )}
            {...props}
        />
    )
}

function PostContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="post-content"
            className={cn('text-foreground/80 leading-relaxed mb-4', className)}
            {...props}
        />
    )
}

function PostFooter({ className, ...props }: React.ComponentProps<'footer'>) {
    return (
        <footer
            data-slot="post-footer"
            className={cn('flex justify-start', className)}
            {...props}
        />
    )
}

export { Post, PostHeader, PostTitle, PostMeta, PostContent, PostFooter }
