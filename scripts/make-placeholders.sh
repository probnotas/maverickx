#!/usr/bin/env bash
# Generates placeholder media so the layout is final before real assets exist.
# Real files simply replace these at the same paths in /public.
# Needs ffmpeg. Run: npm run placeholders
set -euo pipefail
cd "$(dirname "$0")/../public"
mkdir -p video img/posters img/cards img/experts

FF="ffmpeg -hide_banner -loglevel error -y"
DUR=6

# --- Looping videos: deep navy with one slow silver-blue glow -------------
# $1 name, $2 glow x-swing, $3 glow y (fraction of H), $4 glow size
video() {
  local name=$1 swing=$2 gy=$3 size=$4
  local P="2*PI*T/$DUR"
  local G="exp(-((X-(W/2+$swing*sin($P)))^2+(Y-(H*$gy+30*cos($P)))^2)/(2*($size*(1+0.12*sin(2*$P)))^2))"
  $FF -f lavfi -i "color=c=black:s=1280x720:r=24:d=$DUR" \
    -vf "format=rgb24,geq=r='min(255,13+10*Y/H+150*$G)':g='min(255,20+12*Y/H+180*$G)':b='min(255,28+20*Y/H+215*$G)',noise=alls=6:allf=t,format=yuv420p" \
    -c:v libx264 -preset slow -crf 30 -movflags +faststart -an "video/$name.mp4"
  $FF -i "video/$name.mp4" -frames:v 1 -q:v 4 "img/posters/$name.jpg"
}
video hero 160 0.56 90
video statement 320 0.40 160
video stat 60 0.62 220

# --- Card backgrounds: soft diagonal gradients with grain ------------------
# $1 name, $2-$4 top-left rgb, $5-$7 bottom-right rgb
bg() {
  local t="((X/W)*0.45+(Y/H)*0.55)"
  $FF -f lavfi -i "color=c=black:s=900x1100:d=1" -frames:v 1 \
    -vf "format=rgb24,geq=r='$2+($5-$2)*$t':g='$3+($6-$3)*$t':b='$4+($7-$4)*$t',noise=alls=10:allf=u" \
    -q:v 4 "img/cards/$1-bg.jpg"
}
bg mica 120 112 100 52 50 48
bg molecule 34 52 72 12 18 26
bg flask 92 104 112 30 36 42

# --- Cutouts: transparent PNGs, simple shapes ------------------------------
cut() { # $1 name, $2 r, $3 g, $4 b, $5 alpha expressions
  $FF -f lavfi -i "color=c=black@0:s=800x800:d=1" -frames:v 1 \
    -vf "format=rgba,geq=r='$2':g='$3':b='$4':a='$5'" "img/cards/$1-cutout.png"
}

# Mica: a stack of tilted hexagonal sheets with one glowing atom
U="(X-400)"; V="(Y-400+0.25*(X-400))"
HEX="lt(abs($U)*0.866+abs($V)*0.5,300)*lt(abs($V),260)"
LAYER="(0.85+0.15*sin($V/7))"
ATOM="exp(-(pow(X-470,2)+pow(Y-380,2))/900)"
cut mica \
  "min(255,(196*$LAYER)+200*$ATOM)" \
  "min(255,(190*$LAYER)+215*$ATOM)" \
  "min(255,(176*$LAYER)+235*$ATOM)" \
  "255*min(1,$HEX*0.94+$ATOM)"

# Molecule: a glowing core with four bound satellites
BALL() { echo "lt(pow(X-$1,2)+pow(Y-$2,2),pow($3,2))"; }
CORE="exp(-(pow(X-400,2)+pow(Y-400,2))/9000)"
SATS="max(max($(BALL 230 260 70),$(BALL 590 250 62)),max($(BALL 220 570 58),$(BALL 585 560 74)))"
BONDS="lt(abs((X-400)-(Y-400)*1.0),10)*lt(abs(X-400),190)+lt(abs((X-400)+(Y-400)*1.05),10)*lt(abs(X-400),190)"
cut molecule \
  "min(255,150+105*$CORE)" \
  "min(255,178+77*$CORE)" \
  "min(255,207+48*$CORE)" \
  "255*min(1,$CORE*1.4+$SATS*0.95+min(1,$BONDS)*0.7)"

# Flask: narrow neck, conical body, silver-blue liquid
NECK="lt(abs(X-400),55)*gt(Y,110)*lt(Y,340)"
BODY="gt(Y,330)*lt(Y,710)*lt(abs(X-400),55+(Y-330)*0.78)"
LIQ="gt(Y,520)*$BODY"
cut flask \
  "if($LIQ,143,226)" \
  "if($LIQ,176,230)" \
  "if($LIQ,207,232)" \
  "255*min(1,($NECK+$BODY)*0.9+$LIQ*0.1)"

# Expert portrait placeholder (portraits only show for "named" experts)
$FF -f lavfi -i "color=c=0xd9d3c7:s=600x750:d=1" -frames:v 1 -q:v 5 img/experts/placeholder.jpg

du -sh video/* img/cards/* img/posters/* | sort -k2
