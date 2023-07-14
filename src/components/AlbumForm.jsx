import { faker } from "@faker-js/faker";
import { Formik, Field, FieldArray, Form } from "formik";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import albumsSlice from "../redux/albumsSlice";
import Button from "./Button";

function AlbumForm({ closeModal }) {
  const fileInputRef = useRef(null);
  const dispath = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          albumId: faker.string.uuid(),
          albumName: "",
          favorite: 0,
          photos: [undefined],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.albumName) {
            errors.albumName = "Required";
          }
          if (values.photos.length < 2) {
            errors.photos = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispath(albumsSlice.actions.addNewAlbum(values));
          closeModal();
          resetForm();
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="mb-5">
              <Field
                className={`w-full outline-0 border-slate-500 border-b py-3 border-slate-200`}
                placeholder="Name of album"
                type="text"
                name="albumName"
                id="albumName"
              />
              {errors.albumName && touched.albumName && (
                <div className="text-red-500 mt-3">{errors.albumName}</div>
              )}
            </div>
            <div className="mb-5">
              <FieldArray name="photos" className>
                {({ push, remove, form, unshift }) => (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3  max-h-[40vh] overflow-y-auto">
                    {values.photos.map((photo, index) => (
                      <div
                        className="border rounded overflow-hidden w-full h-[140px] sm:h-[120px] lg:h-[170px] relative"
                        key={index}
                      >
                        {photo ? (
                          <>
                            <img
                              src={photo.photoUrl}
                              className="w-full h-full object-cover"
                              alt={photo.photoAlt}
                            />
                            <div className="absolute z-5 top-3 end-3">
                              <Button
                                title={"Remove"}
                                style={"delete"}
                                type="button"
                                onClick={() => {
                                  remove(index);
                                  if (values.photos.length <= 2) {
                                    unshift(undefined);
                                  }
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <Button
                              style={`thumbAddNew`}
                              title={`Add Photo`}
                              type="button"
                              onClick={() => {
                                if (fileInputRef.current) {
                                  fileInputRef.current.click();
                                }
                              }}
                            />
                            <Field
                              name={`photos.${index}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              value={undefined}
                              innerRef={fileInputRef}
                              onChange={(event) => {
                                const file = event.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onloadend = () => {
                                    const base64String = reader.result;
                                    unshift({
                                      photoId: faker.string.uuid(),
                                      photoUrl: base64String,
                                      photoAlt: file.name,
                                      love: false,
                                    });
                                  };
                                }
                              }}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              {errors.photos && touched.photos && (
                <div className="text-red-500 mt-2">{errors.photos}</div>
              )}
            </div>
            <div className="flex justify-between flex-wrap">
              <Button type={"submit"} style={"primary"} title={"Create"} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AlbumForm;
