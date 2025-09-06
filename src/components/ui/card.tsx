import * as React from "react"

import { cn } from "@/lib/utils"

const AnimatedCardBackground = () => (
  <>
    <style jsx>{`
      .wave-container {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: inherit;
        z-index: 0;
      }
      .wave-bg {
        width: 100%;
        height: 100%;
        background: linear-gradient(315deg, rgba(101,0,94,1) 3%, rgba(60,132,206,1) 38%, rgba(48,238,226,1) 68%, rgba(255,25,25,1) 98%);
        animation: gradient 15s ease infinite;
        background-size: 400% 400%;
        background-attachment: fixed;
      }
      .wave {
        background: rgb(255 255 255 / 25%);
        border-radius: 1000% 1000% 0 0;
        position: absolute;
        width: 200%;
        height: 12em;
        animation: wave 10s -3s linear infinite;
        transform: translate3d(0, 0, 0);
        opacity: 0.8;
        bottom: 0;
        left: 0;
        z-index: 1;
      }

      .wave:nth-of-type(2) {
          bottom: -1.25em;
          animation: wave 18s linear reverse infinite;
          opacity: 0.8;
      }

      .wave:nth-of-type(3) {
          bottom: -2.5em;
          animation: wave 20s -1s reverse infinite;
          opacity: 0.9;
      }

      @keyframes gradient {
          0% {
              background-position: 0% 0%;
          }
          50% {
              background-position: 100% 100%;
          }
          100% {
              background-position: 0% 0%;
          }
      }

      @keyframes wave {
          2% {
              transform: translateX(1);
          }

          25% {
              transform: translateX(-25%);
          }

          50% {
              transform: translateX(-50%);
          }

          75% {
              transform: translateX(-25%);
          }

          100% {
              transform: translateX(1);
          }
      }
    `}</style>
    <div className="wave-container">
      <div className="wave-bg"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </div>
  </>
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
      className
    )}
    {...props}
  >
    <AnimatedCardBackground />
    <div className="relative z-10 bg-card/80 backdrop-blur-sm h-full flex flex-col">
        {children}
    </div>
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }