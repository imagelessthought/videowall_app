<table>
  <tr>
    <td><img src="readme/videowall.svg" alt="videowall" width="120" height="120"></td>
    <td><h1>Videowall App</h1></td>
    <td></td>
  </tr>
</table>

This is a simple javascript app that will produce a webpage running slideshows with mixed content (videos and images).  Just drop this onto your webserver and it will work.  The **json/** folder is a **JSON Generator** that will create the json file for your slide automatically. **slides/** contains a demo slide of each layout type.

[DEMO](https://imagelessthought.github.io/developr/videowall/)

## Features:
- Base aspect ratio: **16:9**.
- Base resolution for elements is **1920x1080**.
- Various layouts available, up to sixteen (16) independent elements can be shown at a time layout (see below).
- Each slide is a **json** file.
- An **index** file is used to specify the order of the slides.
- Each **slide** is an idependent slide show, the index can include slides with different layouts.
- You can set a **start time**, or **start date and time** in the slide **json**, in the index file just add an underscore before the slide name to enable.  Leave out the underscore and it will play during the normal slideshow rotation. 
- You can set a countdown to be displayed with an information slide for a **scheduled slide**. 
- You can add a **QR code**  into any corner of any element.
- You can add a **custom logo/image** into any corner of any element.
- You can add **text overalys** to any element.
- Each element in a slide does not have to remain **static**, it can change any number of times you specify.

## Layouts:

**Full Screen/Videowall**
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌─────────────────────────────────┐
    │                                 │
    │                                 │
    │                                 │
    │           <b>3840 x 2160</b>           │
    │             <b>(16:9)</b>              │
    │                                 │
    │                                 │
    │                                 │
    │                                 │
    └─────────────────────────────────┘
</pre>

**2x2 Grid**
<pre style="padding:0; margin: 0; line-height:1;">
    ┌────────────────┬────────────────┐
    │                │                │
    │   <b>1920 x 1080</b>  │                │
    │     <b>(16:9)</b>     │                │
    │                │                │
    ├────────────────┼────────────────┤   
    │                │                │
    │                │                │
    │                │                │
    │                │                │
    └────────────────┴────────────────┘
</pre>

**4x4 Grid (with or without padding around the elements)** 
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌────────────────┬────────────────┬────────────────┬────────────────┐
    │                │                │                │                │
    │    <b>960 x 540</b>   │                │                │                │
    │     <b>(16:9)</b>     │                │                │                │
    │                │                │                │                │
    ├────────────────┼────────────────┼────────────────┼────────────────┤
    │                │                │                │                │
    │                │                │                │                │
    │                │                │                │                │
    │                │                │                │                │
    ├────────────────┼────────────────┼────────────────┼────────────────┤
    │                │                │                │                │
    │                │                │                │                │
    │                │                │                │                │
    │                │                │                │                │
    ├────────────────┼────────────────┼────────────────┼────────────────┤
    │                │                │                │                │
    │                │                │                │                │
    │                │                │                │                │
    │                │                │                │                │
    └────────────────┴────────────────┴────────────────┴────────────────┘
</pre>

**Two Columns**
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌────────────────┬────────────────┐
    │                │                │
    │                │                │
    │                │                │
    │   <b>1920 x 2160</b>  │                │
    │      <b>(8:9)</b>     │                │  
    │                │                │
    │                │                │
    │                │                │
    │                │                │
    └────────────────┴────────────────┘
</pre>

**Column Left**
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌────────────────┬────────────────┐
    │                │                │
    │                │   <b>1920 x 1080</b>  │
    │                │     <b>(16:9)</b>     │
    │   <b>1920 x 2160</b>  │                │   
    │      <b>(8:9)</b>     ├────────────────┤  
    │                │                │
    │                │                │
    │                │                │
    │                │                │
    └────────────────┴────────────────┘
</pre>

**Column Right**
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌────────────────┬────────────────┐
    │                │                │
    │   <b>1920 x 1080</b>  │                │
    │     <b>(16:9)</b>     │                │
    │                │    <b>1920 x 2160</b> │   
    ├────────────────┤      <b>(8:9)</b>     │
    │                │                │
    │                │                │
    │                │                │
    │                │                │
    └────────────────┴────────────────┘
</pre>

**Rows**
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌─────────────────────────────────┐
    │                                 │
    │          <b>3840 x 1080</b>            │
    │             <b>(32:9)</b>              │
    │                                 │
    ├─────────────────────────────────┤   
    │                                 │
    │                                 │
    │                                 │
    │                                 │
    └─────────────────────────────────┘
</pre>

**Row Top**
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌─────────────────────────────────┐
    │                                 │
    │          <b>3840 x 1080</b>            │
    │             <b>(32:9)</b>              │
    │                                 │
    ├────────────────┬────────────────┤   
    │                │                │
    │   <b>1920 x 1080</b>  │                │
    │     <b>(16:9)</b>     │                │      
    │                │                │
    └────────────────┴────────────────┘
</pre>

**Row Bottom**
<pre style="padding:0; margin: 1rem 0; line-height: 1;">
    ┌────────────────┬────────────────┐
    │                │                │
    │   <b>1920 x 1080</b>  │                │
    │     <b>(16:9)</b>     │                │      
    │                │                │
    ├────────────────┴────────────────┤
    │                                 │
    │          <b>3840 x 1080</b>            │
    │             <b>(32:9)</b>              │
    │                                 │
    └─────────────────────────────────┘
</pre>
