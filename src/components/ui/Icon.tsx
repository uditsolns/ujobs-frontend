/**
 * Icon Component
 * Centralized icon system with all platform icons
 */

import { LucideIcon } from 'lucide-react';
import {
  Briefcase, Users, MapPin, Search, Star, CheckCircle, Clock,
  TrendingUp, Award, Shield, Zap, Heart, DollarSign, Calendar,
  Phone, Mail, Home, Building, Truck, Utensils, Wrench, Shirt,
  Baby, Stethoscope, GraduationCap, Code, Scissors, PenTool,
  Music, Camera, Package, ShoppingCart, HeadphonesIcon, MessageSquare,
  Bell, Settings, LogOut, ChevronRight, ChevronLeft, ChevronDown,
  ChevronUp, X, Menu, Filter, Download, Upload, Edit, Trash2,
  Eye, EyeOff, Lock, Unlock, Share2, Bookmark, Flag, AlertCircle,
  Info, HelpCircle, ExternalLink, Copy, Check, Plus, Minus,
  RefreshCw, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Facebook, Twitter, Instagram, Linkedin, Youtube, Globe,
  Smartphone, Monitor, Tablet, Wifi, Bluetooth, Battery,
  Sun, Moon, CloudRain, Wind, Thermometer, Droplets,
  FileText, Folder, File, Image, Video, Mic, Volume2,
  PlayCircle, PauseCircle, SkipForward, SkipBack, Repeat,
  User, UserPlus, UserCheck, UserX, UserMinus, Users2,
  CreditCard, Wallet, Receipt, BanknoteIcon, Target, TrendingDown,
  BarChart, PieChart, Activity, Layers, Layout, Grid,
  List, Columns, Rows, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, Link, Code2, Terminal,
  Save, Send, Printer, Paperclip, Inbox, Archive,
  ShieldCheck, ShieldAlert, ShieldQuestion, Key, Fingerprint,
  Car, Bus, Train, Plane, Ship, Bike, Fuel,
  Store, ShoppingBag, Tag, Percent, Gift, CreditCard as Card,
  Quote
} from 'lucide-react';

export type IconName =
  | 'briefcase' | 'users' | 'mapPin' | 'search' | 'star' | 'checkCircle' | 'clock'
  | 'trendingUp' | 'award' | 'shield' | 'zap' | 'heart' | 'dollar' | 'calendar'
  | 'phone' | 'mail' | 'home' | 'building' | 'truck' | 'utensils' | 'wrench' | 'shirt'
  | 'baby' | 'stethoscope' | 'graduationCap' | 'code' | 'scissors' | 'penTool'
  | 'music' | 'camera' | 'package' | 'shoppingCart' | 'headphones' | 'message'
  | 'bell' | 'settings' | 'logOut' | 'chevronRight' | 'chevronLeft' | 'chevronDown'
  | 'chevronUp' | 'x' | 'menu' | 'filter' | 'download' | 'upload' | 'edit' | 'trash'
  | 'eye' | 'eyeOff' | 'lock' | 'unlock' | 'share' | 'bookmark' | 'flag' | 'alertCircle'
  | 'info' | 'help' | 'externalLink' | 'copy' | 'check' | 'plus' | 'minus'
  | 'refresh' | 'arrowRight' | 'arrowLeft' | 'arrowUp' | 'arrowDown'
  | 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'globe'
  | 'smartphone' | 'monitor' | 'tablet' | 'wifi' | 'bluetooth' | 'battery'
  | 'sun' | 'moon' | 'cloudRain' | 'wind' | 'thermometer' | 'droplets'
  | 'fileText' | 'folder' | 'file' | 'image' | 'video' | 'mic' | 'volume'
  | 'play' | 'pause' | 'skipForward' | 'skipBack' | 'repeat'
  | 'user' | 'userPlus' | 'userCheck' | 'userX' | 'userMinus' | 'users2'
  | 'creditCard' | 'wallet' | 'receipt' | 'banknote' | 'target' | 'trendingDown'
  | 'barChart' | 'pieChart' | 'activity' | 'layers' | 'layout' | 'grid'
  | 'list' | 'columns' | 'rows' | 'alignLeft' | 'alignCenter' | 'alignRight'
  | 'bold' | 'italic' | 'underline' | 'link' | 'code2' | 'terminal'
  | 'save' | 'send' | 'printer' | 'paperclip' | 'inbox' | 'archive'
  | 'shieldCheck' | 'shieldAlert' | 'shieldQuestion' | 'key' | 'fingerprint'
  | 'car' | 'bus' | 'train' | 'plane' | 'ship' | 'bike' | 'fuel'
  | 'store' | 'shoppingBag' | 'tag' | 'percent' | 'gift' | 'card' | 'quote';

const iconMap: Record<IconName, LucideIcon> = {
  briefcase: Briefcase, users: Users, mapPin: MapPin, search: Search, star: Star,
  checkCircle: CheckCircle, clock: Clock, trendingUp: TrendingUp, award: Award,
  shield: Shield, zap: Zap, heart: Heart, dollar: DollarSign, calendar: Calendar,
  phone: Phone, mail: Mail, home: Home, building: Building, truck: Truck,
  utensils: Utensils, wrench: Wrench, shirt: Shirt, baby: Baby, stethoscope: Stethoscope,
  graduationCap: GraduationCap, code: Code, scissors: Scissors, penTool: PenTool,
  music: Music, camera: Camera, package: Package, shoppingCart: ShoppingCart,
  headphones: HeadphonesIcon, message: MessageSquare, bell: Bell, settings: Settings,
  logOut: LogOut, chevronRight: ChevronRight, chevronLeft: ChevronLeft,
  chevronDown: ChevronDown, chevronUp: ChevronUp, x: X, menu: Menu, filter: Filter,
  download: Download, upload: Upload, edit: Edit, trash: Trash2, eye: Eye,
  eyeOff: EyeOff, lock: Lock, unlock: Unlock, share: Share2, bookmark: Bookmark,
  flag: Flag, alertCircle: AlertCircle, info: Info, help: HelpCircle,
  externalLink: ExternalLink, copy: Copy, check: Check, plus: Plus, minus: Minus,
  refresh: RefreshCw, arrowRight: ArrowRight, arrowLeft: ArrowLeft,
  arrowUp: ArrowUp, arrowDown: ArrowDown, facebook: Facebook, twitter: Twitter,
  instagram: Instagram, linkedin: Linkedin, youtube: Youtube, globe: Globe,
  smartphone: Smartphone, monitor: Monitor, tablet: Tablet, wifi: Wifi,
  bluetooth: Bluetooth, battery: Battery, sun: Sun, moon: Moon, cloudRain: CloudRain,
  wind: Wind, thermometer: Thermometer, droplets: Droplets, fileText: FileText,
  folder: Folder, file: File, image: Image, video: Video, mic: Mic, volume: Volume2,
  play: PlayCircle, pause: PauseCircle, skipForward: SkipForward, skipBack: SkipBack,
  repeat: Repeat, user: User, userPlus: UserPlus, userCheck: UserCheck, userX: UserX,
  userMinus: UserMinus, users2: Users2, creditCard: CreditCard, wallet: Wallet,
  receipt: Receipt, banknote: BanknoteIcon, target: Target, trendingDown: TrendingDown,
  barChart: BarChart, pieChart: PieChart, activity: Activity, layers: Layers,
  layout: Layout, grid: Grid, list: List, columns: Columns, rows: Rows,
  alignLeft: AlignLeft, alignCenter: AlignCenter, alignRight: AlignRight,
  bold: Bold, italic: Italic, underline: Underline, link: Link, code2: Code2,
  terminal: Terminal, save: Save, send: Send, printer: Printer, paperclip: Paperclip,
  inbox: Inbox, archive: Archive, shieldCheck: ShieldCheck, shieldAlert: ShieldAlert,
  shieldQuestion: ShieldQuestion, key: Key, fingerprint: Fingerprint, car: Car,
  bus: Bus, train: Train, plane: Plane, ship: Ship, bike: Bike, fuel: Fuel,
  store: Store, shoppingBag: ShoppingBag, tag: Tag, percent: Percent, gift: Gift,
  card: Card, quote: Quote
};


interface IconProps {
  name: IconName;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  strokeWidth?: number;
}

export default function Icon({ name, size = 'md', className = '', strokeWidth = 2 }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  const iconSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <IconComponent
      size={iconSize}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}

// Category to Icon mapping
export const categoryIcons: Record<string, IconName> = {
  'Nurses & Patient Care': 'stethoscope',
  'Patient Caretakers': 'heart',
  'Domestic Maids & Cooks': 'utensils',
  'Professional Drivers': 'car',
  'Housekeeping Staff': 'home',
  'Nannies & Babysitters': 'baby',
  'Elderly Care': 'heart',
  'Private Drivers': 'car',
  'Home Nurses': 'stethoscope',
  'Office Assistants': 'briefcase',
  'Delivery Partners': 'truck',
  'Security Guards': 'shield',
  'Domestic Help': 'home',
  'Healthcare Support': 'heart',
  'Skilled Workers': 'wrench',
  'Driving & Delivery': 'truck',
  'Office Support': 'building',
  'Maids & Cooks': 'utensils',
  'Nurses & Care': 'stethoscope',
  'Electricians': 'zap',
  'Plumbers': 'wrench',
  'Drivers': 'car',
  'Delivery Pros': 'package',
  'Business Helpers': 'users2',
  'Driver': 'car',
  'Delivery': 'truck',
  'Telecaller': 'phone',
  'Sales': 'trendingUp',
  'Office Staff': 'briefcase',
  'Caretaker': 'heart',
  'Nurse': 'stethoscope',
  'Cook': 'utensils',
  'Housekeeping': 'home',
  'Security': 'shield',
  'Waiter': 'utensils',
  'Receptionist': 'users',
  'Accountant': 'fileText',
  'Data Entry': 'code',
  'Customer Service': 'headphones',
  'Marketing': 'trendingUp',
  'HR': 'users',
  'IT Support': 'code',
  'Teacher': 'graduationCap',
  'Mechanic': 'wrench',
  'Electrician': 'zap',
  'Plumber': 'wrench',
  'Carpenter': 'wrench',
  'Tailor': 'scissors',
  'Beautician': 'scissors',
  'Barber': 'scissors',
  'Photographer': 'camera',
  'Videographer': 'video',
  'Graphic Designer': 'penTool',
  'Content Writer': 'fileText',
  'default': 'briefcase'
};

export function getCategoryIcon(categoryName: string): IconName {
  return categoryIcons[categoryName] || categoryIcons.default;
}
