import supabase, { supabaseUrl } from "./supabase";

//query - zapytac
//we query supabase
//We creating query that will then return odpowiedz:)

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //if cabinname contain slashes supabase create folders so we ave to replace slashes
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create/edit cabin
  let query = supabase.from("cabins");

  //A create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;

  //2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin wasnot created"
    );
  }

  //TODO - uwaga jak edytujemy cabine a bedzie problem z uploadowaniem imageu to usunie nam kabine.
  //Do zmiany proces edycji - najpierw upload obrazka a po pomyslnym przeslaniu dopiero update danych kabiny.

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
