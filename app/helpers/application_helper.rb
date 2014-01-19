module ApplicationHelper
  
  #Returns the title of the site.
  def full_title(page_title)
    base_title = "DATERADE - dates on the go"
    if page_title.empty?
      return base_title
    end
    "#{base_title} | #{page_title}"
  end
end
