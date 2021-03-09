<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvitationEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $business;
    public $email;
    public $invitation_token;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($business, $email, $invitation_token)
    {
        $this->business = $business;
        $this->email = $email;
        $this->invitation_token = $invitation_token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.invitationEmail')->with([
            'business'=> $this->business,
            'email'=> $this->email,
            'invitation_token'=> $this->invitation_token
        ]);
    }
}
