---
layout: post
title: "My dotfiles"
comments: true
date: "2020-04-30 02:37:34.090000+00:00"
categories:  [productivity]
tags:  [vim]
---




```vim
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'skielbasa/vim-material-monokai'
Plugin 'flazz/vim-colorschemes'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'ctrlpvim/ctrlp.vim'
""Plugin 'jiangmiao/auto-pairs'
Plugin 'vim-scripts/a.vim'
Plugin 'lsdr/monokai'
Plugin 'godlygeek/tabular'
Plugin 'posva/vim-vue'
Plugin 'fatih/vim-go'
"Plugin 'Yggdroot/indentLine'


" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required

" ==== AirLine Theme Config ==== {{{{

"let g:airline_theme='wombat'
let g:airline_theme='molokai'

"}}}}


" ==== VIM CONFIGURATION SECTION ===={{{

" basic
set number " show line numbers
set showcmd " show last command in status line
"set cursorline " highlight current line
set lazyredraw " redraw in a lazy fasion
set incsearch  " search as characters are entered
set hlsearch " highlight search results
set visualbell
set encoding=utf-8
set backspace=indent,eol,start

" syntax highlighting
au BufNewFile,BufRead *.cuh set filetype=cuda
syntax enable " enable syntax highlighting

" movement
nnoremap j gj
nnoremap k gk
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
:imap jk <Esc>
:imap kj <Esc>

" indentation
set tabstop=4     " display tab as 4-space wide
set shiftwidth=4  " identation width when using << and >>
set expandtab
set hidden


nnoremap th  :tabfirst<CR>
nnoremap tk  :tabnext<CR>
nnoremap tj  :tabprev<CR>
nnoremap <C-y> :tabprev<CR>
nnoremap <C-o> :tabnext<CR>
nnoremap <C-N> :tabnew<CR>
nnoremap tl  :tablast<CR>
nnoremap tt  :tabedit<Space>
nnoremap tn  :tabnext<Space>
nnoremap tm  :tabm<Space>
nnoremap td  :tabclose<CR>
" Alternatively use
nnoremap th :tabnext<CR>
nnoremap tl :tabprev<CR>
nnoremap tn :tabnew<CR>"

:nnoremap <F5> "=strftime("%a_%d_%b_%Y_%T_%p")<CR>P
:inoremap <F5> <C-R>=strftime("%a_%d_%b_%Y_%T_%p")<CR>

set relativenumber
set pastetoggle=<F2>
" color
"set background=dark
"colorscheme wombat
colorscheme monokai
:map <F8>  :! python3.6 %<CR>
:map <F9>  :! time go run %<CR>
:nnoremap <silent> <F3> :.s/\(.*\)/[\1](\1)/g<CR>:noh<CR>
"set bg=dark
let g:go_version_warning = 0
let g:go_fmt_fail_silently = 1
let g:go_fmt_options = ''
let g:go_fmt_autosave = 0
```