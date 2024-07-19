import { PlayOne, Star } from "@icon-park/react";
import "../../../i18n";
// import React from "react";
import { useTranslation } from "react-i18next";
export default function Playlist() {
  const { t } = useTranslation();

  return (<div className="lr-playlist bg-base-100">
    <div className="lr-playlist-header p-12 flex sticky top-0 bg-base-100">
      <div className="lr-playlist-cover avatar w-72 h-72 flex-none shrink-0 mr-12">
        <div className="w-72 rounded-xl">
          <img src="https://is1-ssl.mzstatic.com/image/thumb/Video221/v4/ca/fd/49/cafd491c-73cb-1c69-725d-fc403e5c38df/Jobbaeb4dfc-eb87-49f1-9599-4197d57bd431-171758844-PreviewImage_Preview_Image_Intermediate_nonvideo_sdr_334495459_1832019866-Time1720824456709.png/316x316bb.webp" />
        </div>
      </div>
      <div className="lr-playlist-info flex-1 pt-8">
        <h1 className="text-4xl font-bold mb-4">The Death of Slim Shady</h1>
        <div className="text-xl mb-1">Eminem</div>
        <div className="text-sm mb-1">HIP-HOP/RAP · 2024</div>
        <div className="text-sm mb-4 h-20 text-ellipsis overflow-hidden">Whether as Marshall Mathers or Slim Shady, Eminem never fails to make a strong impression. His discography regularly documents a struggle between the Detroit-bred rap superstar’s two outspoken personas, an artistic battle followed closely by his most ardent and attentive fans, while pitchfork-wielding outsiders and his more casual listeners never bothered to discern the difference. The willfully profane Slim and the comparatively less sacrilegious Marshall compose a dramaturgical dyad that makes each of his album releases feel like blockbusters. That said, the stakes feel dramatically high on The Death of Slim Shady (Coup De Grâce), its title the most thematically loaded of his two-and-a-half-decade career.

If this does end up the genuine final curtain call for Eminem’s most notorious alter ego, he makes it a point to execute it on his own controversy-baiting terms, whether people like it or not. Addressing his detractors head-on, “Habits” defensively dismantles criticisms both internal and external, taking personal inventory while decrying political correctness. Cancel culture and wokeness as existential threats stay front of mind throughout, looming particularly large over the combative “Antichrist” and the Dr. Dre co-produced “Lucifer.” Repeated references to Caitlyn Jenner won’t quell the perpetual transphobia accusations Eminem has long faced, but on songs like “Evil” and “Road Rage” he at least aims to clarify his positions amid his characteristically clever wordplay.

Naturally, Slim isn’t about to go out quietly. Ever the eager pugilist, he exploits his upper hand with Fight Club panache on “Brand New Dance” and “Trouble.” The character’s antagonism vacillates between self-destructive outbursts and strategic gaslighting, gleefully poking at touchy topics on “Houdini” and assigning we’re-in-this-together complicity to Marshall on the surprise sequel “Guilty Conscience 2.” Yet even as the tragicomically intertwined foes grapple with one another, the album still makes room for something as personal as “Temporary,” a heartfelt message to his daughter for after he’s gone. With the added benefit of a few unexpected cameos, including Michigan-repping cut “Tobey” with Big Sean and BabyTron, the over-the-top theatricality driving The Death of… feels like fan service, giving his longtime patrons the Eminem show they’ve come to expect from him.</div>
        <div className="flex">
          <button className="btn mr-4">
            <PlayOne theme="filled" size="24" fill="#333"/>
            {t("Playlist.Play")}
          </button>
          <button className="btn btn-ghost">
            <Star theme="filled" size="24" fill="#333"/>
          </button>
        </div>
      </div>
    </div>
    <ul className="lr-playlist-list container px-4 mx-auto my-4 flex flex-col">
      {
        Array.from({ length: 20 }, i => i).map((_, i) => {
          return (<li className="flex items-center hover:bg-slate-200 rounded-lg px-6 py-3 cursor-pointer">
            <div className="flex-none mr-2 text-neutral w-8">
              { i + 1 }
            </div>
            <div className="flex-1 pt-1">
              <div className="flex">
                <div className="text-xl text-accent-content font-bold mr-2">网易云音乐</div>
                <div className="text-neutral">(网易云)</div>
              </div>
              <div className="text-neutral text-sm">
                丁磊
              </div>
            </div>
            <div className="flex-none text-neutral">3:22</div>
          </li>)
        })
      }
    </ul>
  </div>)
}