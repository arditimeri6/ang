<?php

namespace App\Jobs;

use App\Mail\InvitationEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendInvitationMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $business;
    protected $email;
    protected $invitation_token;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($business,  $email, $invitation_token)
    {
        $this->business = $business;
        $this->email = $email;
        $this->invitation_token = $invitation_token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->email)->send(new InvitationEmail($this->business, $this->email, $this->invitation_token));
    }
}
