'use server';

import { redirect } from 'next/navigation';

import { savePhoto } from './photos';
import { revalidatePath } from 'next/cache';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

function isInvalidText(text) {
  return !text || text.trim() === '';
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim());
}

// For when the share form is wired up: validates formData, then savePhoto.
// savePhoto expects photo.image to be a path string (after uploading the file elsewhere).
export async function sharePhoto(_prevState, formData) {
  const photo = {
    title: formData.get('title'),
    location: formData.get('location'),
    description: formData.get('description'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(photo.title) ||
    isInvalidText(photo.location) ||
    isInvalidText(photo.description) ||
    isInvalidText(photo.creator) ||
    !isValidEmail(photo.creator_email) ||
    !photo.image ||
    photo.image.size === 0
  ) {
    return { message: 'Invalid input' };
  }

  if (photo.image.size > MAX_IMAGE_SIZE) {
    return {
      message: 'Image is too large. Maximum size is 5MB.',
    };
  }

  try {
    await savePhoto(photo);
    revalidatePath('/photos', 'layout');
  } catch (error) {
    return {
      message: 'Something went wrong. Please try again.',
    };
  }
  redirect('/photos');
}
