import React from 'react';

export const metadata = {
  title: 'Help & FAQ - Story Sprout',
  description: 'Frequently asked questions and help resources for Story Sprout users',
};

export default function HelpFAQ() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text bg-gradient-to-r from-primary to-teal">
        Help & FAQ
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg mb-8">
          Find answers to commonly asked questions about Story Sprout and learn how to make the most
          of our personalized children's book platform.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Getting Started</h2>

            <div className="space-y-6">
              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  How do I create my first story?
                </h3>
                <p>Creating your first personalized story is easy:</p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Sign up for a Story Sprout account</li>
                  <li>Click on "Create Story" in the navigation menu</li>
                  <li>Enter your child's name and other personalization details</li>
                  <li>Choose a story theme or template</li>
                  <li>Upload photos if you'd like to include them</li>
                  <li>Preview your story and make any adjustments</li>
                  <li>Finalize and save your creation</li>
                </ol>
                <p className="mt-2">
                  Your story will be saved to your account, where you can view it online or order a
                  printed copy.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  What devices can I use Story Sprout on?
                </h3>
                <p>Story Sprout works on any device with a modern web browser, including:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Desktop computers (Windows, Mac, Linux)</li>
                  <li>Laptops</li>
                  <li>Tablets</li>
                  <li>Smartphones</li>
                </ul>
                <p className="mt-2">
                  Our responsive design ensures a great experience regardless of screen size.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  Do I need to create an account?
                </h3>
                <p>
                  Yes, a free account is required to create and save stories. This allows you to:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Save your work in progress</li>
                  <li>Access your stories from any device</li>
                  <li>Edit your stories after creation</li>
                  <li>Order printed copies of your stories</li>
                  <li>Share your stories with family members</li>
                </ul>
                <p className="mt-2">
                  Creating an account takes less than a minute with our simple sign-up process.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Story Creation</h2>

            <div className="space-y-6">
              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  What story themes are available?
                </h3>
                <p>
                  Story Sprout offers a variety of themes for different ages and interests,
                  including:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Adventure stories</li>
                  <li>Space exploration</li>
                  <li>Underwater adventures</li>
                  <li>Fairy tales and fantasy</li>
                  <li>Animal friends</li>
                  <li>Superhero stories</li>
                  <li>Educational themes</li>
                  <li>Seasonal and holiday stories</li>
                </ul>
                <p className="mt-2">
                  We regularly add new themes, so check back often for the latest options.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  Can I include photos in my story?
                </h3>
                <p>
                  Yes! You can upload photos to include in your personalized story. We recommend:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Clear, well-lit images</li>
                  <li>Photos with simple backgrounds</li>
                  <li>Images where the subject's face is clearly visible</li>
                  <li>JPG, PNG, or HEIF file formats</li>
                  <li>Files under 10MB in size</li>
                </ul>
                <p className="mt-2">
                  Our system will help position and crop your photos to fit perfectly in the story.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  How much can I customize my story?
                </h3>
                <p>Story Sprout offers several levels of customization:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Character names and appearances</li>
                  <li>Story settings and locations</li>
                  <li>Inclusion of pets or siblings</li>
                  <li>Photo integration</li>
                  <li>Color themes and visual styles</li>
                  <li>Story length and complexity (age-appropriate)</li>
                </ul>
                <p className="mt-2">
                  Premium subscribers have access to additional customization options.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Account & Billing</h2>

            <div className="space-y-6">
              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  Is Story Sprout free to use?
                </h3>
                <p>Story Sprout offers both free and premium options:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Free Account:</strong> Create and view digital stories with basic
                    customization
                  </li>
                  <li>
                    <strong>Premium Subscription:</strong> Access all themes, advanced
                    customization, and discounted printing
                  </li>
                  <li>
                    <strong>One-time Purchases:</strong> Order printed books without a subscription
                  </li>
                </ul>
                <p className="mt-2">
                  You can create and view digital stories with a free account, while premium
                  features and printed books have associated costs.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  How do I change my subscription?
                </h3>
                <p>To manage your subscription:</p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Log in to your Story Sprout account</li>
                  <li>Go to your Account Settings</li>
                  <li>Select the "Subscription" tab</li>
                  <li>Choose "Upgrade," "Downgrade," or "Cancel" as needed</li>
                </ol>
                <p className="mt-2">
                  Changes to your subscription will take effect at the end of your current billing
                  cycle.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  What payment methods do you accept?
                </h3>
                <p>We accept various payment methods, including:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Credit cards (Visa, Mastercard, American Express, Discover)</li>
                  <li>PayPal</li>
                  <li>Apple Pay</li>
                  <li>Google Pay</li>
                </ul>
                <p className="mt-2">
                  All payments are processed securely through our payment providers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Printed Books</h2>

            <div className="space-y-6">
              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  How do I order a printed copy of my story?
                </h3>
                <p>To order a printed copy:</p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Open the story you want to print from your dashboard</li>
                  <li>Click the "Order Printed Book" button</li>
                  <li>Select your preferred format (hardcover, softcover)</li>
                  <li>Review your story one final time</li>
                  <li>Enter shipping information and payment details</li>
                  <li>Confirm your order</li>
                </ol>
                <p className="mt-2">
                  You'll receive an email confirmation with tracking information once your book
                  ships.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  What is the quality of printed books?
                </h3>
                <p>Our printed books feature:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>High-quality color printing</li>
                  <li>Durable binding designed for children's use</li>
                  <li>Premium paper that resists tearing</li>
                  <li>Eco-friendly materials and processes</li>
                  <li>Professional finishing and quality control</li>
                </ul>
                <p className="mt-2">
                  We partner with professional printing services to ensure each book meets our high
                  standards.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  How long does shipping take?
                </h3>
                <p>Shipping times vary based on your location and chosen shipping method:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Standard Shipping:</strong> 7-10 business days
                  </li>
                  <li>
                    <strong>Expedited Shipping:</strong> 3-5 business days
                  </li>
                  <li>
                    <strong>Rush Shipping:</strong> 1-2 business days (where available)
                  </li>
                </ul>
                <p className="mt-2">
                  Please note that production time (typically 2-3 business days) is in addition to
                  shipping time.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Technical Support</h2>

            <div className="space-y-6">
              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  I'm having trouble uploading photos. What should I do?
                </h3>
                <p>If you're experiencing issues with photo uploads, try these solutions:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Ensure your image is under 10MB in size</li>
                  <li>Try a different file format (JPG, PNG)</li>
                  <li>Use a different browser or device</li>
                  <li>Check your internet connection</li>
                  <li>Clear your browser cache and cookies</li>
                </ul>
                <p className="mt-2">
                  If problems persist, contact our support team with details about your device and
                  browser.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  How do I reset my password?
                </h3>
                <p>To reset your password:</p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Click "Sign In" on the homepage</li>
                  <li>Select "Forgot Password"</li>
                  <li>Enter the email address associated with your account</li>
                  <li>Check your email for a password reset link</li>
                  <li>Follow the link to create a new password</li>
                </ol>
                <p className="mt-2">
                  If you don't receive the email, check your spam folder or contact support.
                </p>
              </div>

              <div className="bg-lavender/5 p-6 rounded-lg border">
                <h3 className="text-xl font-display font-semibold mb-2">
                  How can I contact customer support?
                </h3>
                <p>We offer several ways to get help:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Email:</strong> support@storysprout.com
                  </li>
                  <li>
                    <strong>Chat:</strong> Available on our website during business hours
                  </li>
                  <li>
                    <strong>Help Center:</strong> Browse our knowledge base for instant answers
                  </li>
                </ul>
                <p className="mt-2">
                  Our support team is available Monday through Friday, 9am to 6pm Eastern Time.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-lavender/10 to-background rounded-lg border text-center">
          <h2 className="text-2xl font-display font-semibold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Our support team is ready to help you with any questions or concerns.
          </p>
          <a
            href="mailto:support@storysprout.com"
            className="inline-block bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-md hover:shadow-primary/20 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
