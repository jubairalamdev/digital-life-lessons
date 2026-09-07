import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { Button } from '@heroui/react'
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { serverMutation } from '@/lib/actions/common'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  const currentSession = await auth.api.getSession({
              headers: await headers(),
          });
      
          const user = currentSession?.user;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const userPayload = {
        plan: "premium"
    }
    await serverMutation(`/api/users/upgrade/plan/${user.id}`, userPayload, 'PATCH');
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-3xl p-10 md:p-12 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full -z-10" />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500/10 p-5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-14 h-14 text-emerald-400" />
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
            Payment Successful!
          </h1>
          
          <p className="text-blue-400 font-bold text-lg mb-6">
            Welcome to Premium ⭐
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-8 flex items-center gap-3 justify-start">
            <div className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-lg">
              <Mail size={16} className="text-zinc-500 dark:text-zinc-400" />
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-left">
              A confirmation receipt has been sent to{' '}
              <span className="text-zinc-900 dark:text-white font-semibold block sm:inline">
                {customerEmail}
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/dashboard" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl transition-colors">
              Go to Dashboard
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Fallback for any other unhandled statuses
  return redirect('/')
}