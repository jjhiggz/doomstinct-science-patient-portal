/**
 * Layout component for authentication routes (/login and /signup)
 *
 * This file defines the shared layout structure used across authentication pages.
 * It creates a two-column layout with:
 * - Left column: Contains the app logo and authentication forms
 * - Right column: Displays a decorative background image (hidden on mobile)
 *
 * The actual authentication forms are rendered via the Outlet component
 * which allows child routes to inject their specific content.
 */

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import doomslayerPic from "/doomslayer.jpg?url";

export const Route = createFileRoute("/(auth)/_auth")({
  loader: ({ context }) => {
    console.log(context.user);
    if (context.user) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid lg:grid-cols-2 min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex justify-center items-center bg-primary rounded-md w-6 h-6 text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Doomstinct Science
          </a>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="lg:block relative hidden bg-muted">
        <img
          src={doomslayerPic}
          alt="Image"
          className="dark:brightness-[0.2] absolute inset-0 w-full h-full dark:grayscale object-cover"
        />
      </div>
    </div>
  );
}
